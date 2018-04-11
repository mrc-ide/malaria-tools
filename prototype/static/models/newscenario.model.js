function NewScenario(countries, parent) {
    var self = this;
    self.countries = ko.observableArray(countries);
    self.parent = parent;

    self.selectedCountry = ko.observable();
    self.selectedRegion = ko.observable();
    self.name = ko.observable();
    self.country = ko.computed(function(){
        return self.selectedCountry();
    });
    self.region = ko.computed(function(){
        return self.selectedRegion();
    });
    self.selectCountry = function(country, event) {
        self.selectedCountry(country);
        self.selectedRegion(null);
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
            self.parent.scenarios.push(self);
            self.parent.currentScenario(self);
        } else {
            console.log("Discarded attempt to create invalid scenario");
        }
    };

    self.clear = function() {
        self.name(null);
        self.selectedCountry(null);
        self.selectedRegion(null);
        $("#new-scenario").find(".collapse").collapse("hide");
    }
}