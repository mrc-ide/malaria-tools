var countries = [
    "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Cote d'Ivoire", "Democratic Republic of the Congo", "Djibouti", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Malawi", "Mali", "Mauritania", "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of Congo", "Rwanda", "Senegal", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland", "Tanzania", "Togo", "Uganda", "Zambia", "Zimbabwe"
];

function AppModel() {
    var self = this;
    var regionObjects = ["Region 1", "Region 2", "Region 3", "Region 4"].map(function(x){
        return new Region(x, 2013, 0, 5, {f: ko.observable(20), a: ko.observable(80), g: ko.observable(0)})
    });
    var countryObjects = countries.map(function (x) {
        return new Country(x, regionObjects);
    });

    self.years = ko.observableArray([2011, 2012, 2013, 2014, 2015, 2016, 2017]);

    self.mode = ko.observable('scenario');
    self.scenarioMode = ko.observable('intervention');
    self.regionMode = ko.observable('view');
    self.results = new Results(self);

    self.countries = ko.observableArray(countryObjects);
    self.scenarios = ko.observableArray([
        new Scenario("Scenario 1", countryObjects[0], null),
        new Scenario("Scenario 2", countryObjects[1], null),
        new Scenario("Scenario 3", countryObjects[2], null),
        new Scenario("Scenario 4", countryObjects[3], null),
        new Scenario("Scenario 5", countryObjects[4], null),
        new Scenario("Scenario 6", countryObjects[5], null),
        new Scenario("Scenario 7", countryObjects[6], null),
        new Scenario("Scenario 8", countryObjects[7], null),
        new Scenario("Scenario 9", countryObjects[8], null)
    ]);

    self.currentScenario = ko.observable("results");

    self.currentCountry = ko.observable(self.countries()[0]);
    self.currentRegion = ko.observable(self.currentCountry().regions()[0]);
    self.selectedCountry = ko.observable(self.countries()[0]);

    self.newScenario = ko.observable(new NewScenario(countryObjects, self));
    self.newCountryForm = ko.observable(new NewCountryForm(self));

    self.changeCountry = function (data) {
        self.currentCountry(data);
        self.currentRegion(data().regions()[0]);
        self.regionMode('view');
        self.drawLine();
        self.drawPie();
    };

    self.changeRegion = function (data) {
        self.currentRegion(data);
        self.regionMode('view');
        self.drawLine();
        self.drawPie();
    };

    self.baselineCountry = ko.computed(function() {
        if (self.mode() == "country") {
            return self.currentCountry();
        } else if (self.currentScenario() != "results") {
            return self.currentScenario().country();
        } else {
            return null;
        }
    }, self);
    self.canEditCountry = ko.computed(function() {
        if (self.baselineCountry()) {
            return self.baselineCountry().editable;
        } else {
            return false;
        }
    }, self);

    self.selectedScenarios = ko.computed(function() {
        return self.scenarios().filter(function(s) {
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

    self.drawPie = function () {

        $.each($('.vectors'), function () {
            new Chart($(this), {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [20, 0, 80],
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

    self.showScenarioSection = ko.computed(function () {
        return self.mode() == "scenario"
            && self.currentScenario()
            && self.currentScenario() != "results";
    }, self);
    self.showResultsSection = ko.computed(function () {
        return self.mode() == "scenario"
            && self.currentScenario() == "results";
    });
    self.hasResults = ko.computed(function() {
        return self.scenarios().length > 0;
    }, self);
    self.showResultsSidebar = ko.computed(function() {
        return self.showResultsSection() 
            && self.hasResults();
    }, self);

    self.showResults = function () {
        self.results.render();
        return self.currentScenario("results");
    };

    self.setupNewCountryForm = function() {
        var scenario = null;
        var country = self.currentCountry();
        if (self.mode() == "scenario") {
            scenario = self.currentScenario();
            country = scenario.country();
        }
        self.newCountryForm().setup(country, scenario);
    };

    self.changeBaseline = function() {
        var scenario = self.currentScenario();
        scenario.country(self.newScenario().selectedCountry());
        scenario.region(self.newScenario().selectedRegion());
    };
}
