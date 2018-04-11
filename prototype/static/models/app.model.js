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

    self.mode = ko.observable('scenario');
    self.scenarioMode = ko.observable('intervention');
    self.regionMode = ko.observable('view');
    self.results = new Results();

    self.countries = ko.observableArray(countryObjects);
    self.scenarios = ko.observableArray([]);

    self.currentScenario = ko.observable("results");

    self.currentCountry = ko.observable(self.countries()[0]);
    self.currentRegion = ko.observable(self.currentCountry().regions()[0]);
    self.selectedCountry = ko.observable(self.countries()[0]);
    self.newCountry = ko.computed(function () {
        return new Country(self.selectedCountry().name + "-1", regionObjects, true)
    });
    self.addCountry = function () {
        self.countries.push(self.newCountry());
        self.countries.sort(function (left, right) {
            return left.name < right.name ? -1 : 1
        });

        self.currentCountry(self.newCountry());
        self.currentRegion(self.newCountry().regions()[0]);
        self.mode('country');
    };
    self.newScenario = ko.observable(new NewScenario(countryObjects, self));

    self.validVectors = ko.computed(function () {
        var total = parseInt(self.currentRegion().vectors().f())
            + parseInt(self.currentRegion().vectors().a())
            + parseInt(self.currentRegion().vectors().g());

        return total === 100;
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
}

function Country(name, regions, editable) {
    this.name = name;
    this.regions = ko.observableArray(regions);
    this.editable = editable;
}


function Region(name, year, ageStart, ageEnd, vectors) {
    this.name = name;
    this.year = ko.observable(year);
    this.ageStart = ko.observable(ageStart);
    this.ageEnd = ko.observable(ageEnd);
    this.vectors = ko.observable(vectors);
}
