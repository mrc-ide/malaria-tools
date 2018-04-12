var countries = [
    "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Cote d'Ivoire", "Democratic Republic of the Congo", "Djibouti", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Malawi", "Mali", "Mauritania", "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of Congo", "Rwanda", "Senegal", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland", "Tanzania", "Togo", "Uganda", "Zambia", "Zimbabwe"
];

function AppModel() {
    var self = this;
    var regionObjects = ["Whole country", "Region 1", "Region 2", "Region 3", "Region 4"].map(function (x) {
        return new Region(x, 2013, 0, 5, {f: ko.observable(20), a: ko.observable(80), g: ko.observable(0)})
    });
    var countryObjects = countries.map(function (x) {
        return new Country(x, regionObjects);
    });

    self.years = ko.observableArray([2011, 2012, 2013, 2014, 2015, 2016, 2017]);

    self.mode = ko.observable('scenario');
    self.scenarioMode = ko.observable('intervention');
    self.regionMode = ko.observable('view');

    self.countries = ko.observableArray(countryObjects);
    self.scenarios = ko.observableArray([
        /*new Scenario("Scenario 1", countryObjects[0], null),
        new Scenario("Scenario 2", countryObjects[0], countryObjects[0].regions()[0]),
        new Scenario("Scenario 3", countryObjects[0], countryObjects[0].regions()[1]),
        new Scenario("Scenario 4", countryObjects[0], countryObjects[0].regions()[2]),
        new Scenario("Scenario 5", countryObjects[1], null)*/
    ]);

    self.currentScenario = ko.observable("results");

    self.currentCountry = ko.observable(self.countries()[0]);
    self.currentRegion = ko.observable(self.currentCountry().regions()[0]);
    self.selectedCountry = ko.observable(self.countries()[0]);

    self.newScenario = ko.observable(new NewScenario(countryObjects, self));
    self.newCountryForm = ko.observable(new NewCountryForm(self));
    self.updateScenariosForm = ko.observable(new UpdateScenariosForm(self));

    self.initSliders = function () {

        $(".slider").slider({
            create: function (event, ui) {
                $(this).slider('value', $(this).data('initial'));
            },
            change: function (event, ui) {

                var selector = $(this).data("control");
                $(selector)
                    .val(ui.value);
            },
            range: "min"
        });

        $("[data-role=slider-value]").change(function (e) {
            var selector = $(this).data("target");
            var slider = $(selector);
            if (e.target.value !== slider.slider("value"))
                slider.slider("value", e.target.value);

        });
    }

    self.changeCountry = function (data) {
        self.currentCountry(data);
        self.currentRegion(data.regions()[0]);
        self.regionMode('view');
        self.drawLine();
        self.drawPie();
    };

    self.changeRegion = function (data) {
        self.currentRegion(data);
        self.regionMode('view');
        self.drawLine();
        self.drawPie();
        self.initSliders();
    };

    self.baselineCountry = ko.computed(function () {
        if (self.mode() == "country") {
            return self.currentCountry();
        } else if (self.currentScenario() != "results") {
            return self.currentScenario().country();
        } else {
            return null;
        }
    }, self);

    self.canEditCountry = ko.computed(function () {
        if (self.baselineCountry()) {
            return self.baselineCountry().editable;
        } else {
            return false;
        }
    }, self);

    self.selectedScenarios = ko.computed(function () {
        return self.scenarios().filter(function (s) {
            return s.selected();
        });
    });

    self.drawLine = function () {
        $.each($('.seasonal'), function () {
            new Chart($(this), {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: 'rainfall',
                        borderColor: "#3e95cd",
                        data: [12, 19, 15, 13, 10, 3, 2, 2, 4, 7, 11, 14]
                    },
                        {
                            label: 'incidence',
                            borderColor: "#8e5ea2",
                            data: [11, 12, 18, 15, 13, 9, 4, 3, 3, 5, 8, 12]
                        }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Prevalence"
                            }
                        }]
                    }
                }
            });
        })
    };

    self.pieChart = null;

    self.drawPie = function () {
        var vectors = self.currentRegion().vectors();
        if (self.pieChart){
            self.pieChart.destroy();
        }
        $.each($('.vectors'), function () {
            self.pieChart = new Chart($(this), {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [vectors.f(), vectors.a(), vectors.g()],
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"]
                    }],

                    labels: [
                        'Funestus',
                        'Arabiensis',
                        'Gambiae'
                    ]
                },
                options: {
                    title: {
                        text: "Vectors",
                        display: true,
                        position: "left"
                    }
                }
            });
        })
    };

    self.loading = ko.observable(false);

    self.showScenarioSection = ko.computed(function () {
        return self.mode() == "scenario"
            && self.currentScenario()
            && self.currentScenario() != "results";
    }, self);

    self.showResultsSection = ko.computed(function () {
        return self.mode() == "scenario"
            && self.currentScenario() == "results";
    });

    self.hasResults = ko.computed(function () {
        return self.scenarios().length > 0;
    }, self);

    self.showResultsSidebar = ko.computed(function () {
        return self.showResultsSection() && !self.loading()
            && self.hasResults();
    }, self);

    self.showResults = function () {
        self.loading(true);
        setTimeout(function () {
            self.loading(false);
        }, 5000);
        return self.currentScenario("results");
    };

    self.setupNewCountryForm = function () {
        var scenario = null;
        var country = self.currentCountry();
        if (self.mode() == "scenario") {
            scenario = self.currentScenario();
            country = scenario.country();
        }

        self.newCountryForm().setup(country, scenario);
    };

    self.changeBaseline = function () {
        $("#choose-different-baseline").find(".collapse").collapse("hide");
        var scenario = self.currentScenario();
        console.log(self.newScenario().selectedCountry());
        scenario.country(self.newScenario().selectedCountry());
        scenario.region(self.newScenario().selectedRegion());
        self.currentRegion(scenario.region());
        self.drawPie();
    };

    self.results = new Results(self);
    self.initSliders();
}
