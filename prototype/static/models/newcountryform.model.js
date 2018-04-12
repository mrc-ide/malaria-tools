function NewCountryForm(app) {
    var self = this;

    self.app = app;
    self.name = ko.observable();
    self.regions = ko.observableArray();
    self.forScenario = ko.observable();

    self.addCountry = function () {
        var country = new Country(self.name(), self.regions(), true);
        self.app.countries.push(country);
        self.app.countries.sort(function (left, right) {
            return left.name < right.name ? -1 : 1
        });

        self.app.currentCountry(country);
        self.app.currentRegion(country.regions()[0]);
        self.app.mode('country');

        var scenario = self.forScenario();
        if (scenario) {
            scenario.country(country);
            var equivalentRegion = country.regions.find(function(r) { 
                r.name() == scenario.region().name 
            });
            scenario.region(equivalentRegion);
        }
    };

    self.setup = function(country, scenario) {
        self.name(country.name + "-1");
        self.regions(country.regions().map(function(r) { return r.copy() }));
        if (scenario) {
            self.forScenario(scenario);
        }
    }
}