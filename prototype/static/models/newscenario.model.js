function NewScenario(countries, parent) {
    var self = this;
    self.countries = ko.observableArray(countries);
    self.parent = parent;

    self.selectedCountry = ko.observable();
    self.selectedRegion = ko.observable();
    self.name = ko.observable();
    
    self.selectCountry = function(country, event) {
        self.selectedCountry(country);
        self.selectedRegion(country.regions()[0]);
        var item = $(event.target).closest("li");
        item.closest("ul").find(".collapse").collapse("hide");
        item.find(".collapse").collapse("show");
    };

    self.selectRegion = function(region) {
        self.selectedRegion(region);
    };

    self.isActive = function(countryOrRegion) {
        if (self.selectedRegion()) {
            return self.selectedRegion() == countryOrRegion;
        } else if (self.selectedCountry()) {
            return self.selectedCountry() == countryOrRegion;
        } else {
            return false;
        }
    };

    self.isValid = ko.computed(function() {
        return this.name() && (this.selectedCountry() || this.selectedRegion());
    }, this);

    self.createScenario = function() {
        if (self.isValid()) {
            var scenario = new Scenario(self.name(), self.selectedCountry(), self.selectedRegion());
            self.parent.scenarios.push(scenario);
            self.parent.currentScenario(scenario);
            self.parent.results.needsRerun.push(scenario);
        } else {
            console.log("Discarded attempt to create invalid scenario");
        }

    };

    self.clear = function() {
        self.name(null);
        self.selectedCountry(null);
        self.selectedRegion(null);
        $("#new-scenario").find(".collapse").collapse("hide");
    };
}