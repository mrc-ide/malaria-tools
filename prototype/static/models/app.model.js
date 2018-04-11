var countries = [
    "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Cote d'Ivoire", "Democratic Republic of the Congo", "Djibouti", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Malawi", "Mali", "Mauritania", "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of Congo", "Rwanda", "Senegal", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland", "Tanzania", "Togo", "Uganda", "Zambia", "Zimbabwe"
];

function AppModel() {
    var self = this;
    var countryObjects = countries.map(function(x) {
        return new Country(x, ["Region 1", "Region 2", "Region 3", "Region 4"]);
    });

    self.mode = ko.observable('scenario');
    self.scenarioMode = ko.observable('intervention');
    self.results = new Results();

    self.countries = ko.observableArray(countryObjects);
    self.scenarios = ko.observableArray([]);

    self.currentScenario = ko.observable("results");

    self.currentCountry = ko.observable(self.countries()[0]);
    self.currentRegion = ko.observable(self.currentCountry().regions()[0]);
    self.selectedCountry = ko.observable(self.countries()[0]);
    self.newCountry = ko.computed(function(){
        return new Country(self.selectedCountry().name + "-1",  ["Region 1", "Region 2", "Region 3", "Region 4"])
    });
    self.addCountry = function(){
        self.countries.push(self.newCountry());
        self.countries.sort(function(left, right) {
            return left.name < right.name ? -1 : 1});

        self.currentCountry(self.newCountry());
        self.currentRegion(self.newCountry().regions()[0]);
    };
    self.newScenario = ko.observable(new NewScenario(countryObjects, self));

    self.myLineChart = null;
    self.myPieChart = null;
    self.drawLine = function() {
        if (!self.myLineChart){
            $.each($('.seasonal'), function() {
                self.myLineChart = new Chart($(this), {
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
        }
    };

    self.drawPie = function() {
        if (!self.myPieChart){
            $.each($('.vectors'), function() {
                self.myPieChart = new Chart($(this), {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: [20, 0, 80],
                            backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"]
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

        }
    }

    self.showScenarioSection = ko.computed(function() {
        return self.mode() == "scenario"
            && self.currentScenario() 
            && self.currentScenario() != "results";
    }, self);
    self.showResultsSection = ko.computed(function() {
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

    self.showResults = function() {
        self.results.render();
        return self.currentScenario("results");
    };
}

function Country(name, regions) {
    this.name = name;
    this.regions = ko.observableArray(regions);
}
