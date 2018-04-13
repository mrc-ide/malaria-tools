function NewCountryForm(app) {
    var self = this;

    self.app = app;
    self.originalCountry = ko.observable();
    self.originalName = ko.computed(function() {
        if (this.originalCountry()) {
            return this.originalCountry().name;
        } else {
            return null;
        }
    }, self);
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

        self.app.regionMode('edit');
        self.app.initSliders();

        var scenario = self.forScenario();
        if (scenario) {
            scenario.changeCountry(country);
            var relatedScenarios = self.app.scenarios().filter(function(s) { 
                return s != scenario && s.country() == self.originalCountry();
            });
            if (relatedScenarios.length > 0) {
                self.app.updateScenariosForm().setup(scenario, relatedScenarios, self.originalCountry(), country);
                return;
            }
        }
    };

    self.setup = function(country, scenario) {
        self.originalCountry(country);
        self.name(country.name + " (Modified)");
        self.regions(country.regions().map(function(r) { return r.copy() }));
        if (scenario) {
            self.forScenario(scenario);
        }
    }
}