function Scenario(name, country, region) {
	var self = this;
	this.name = ko.observable(name);
	this.country = ko.observable(country);
	this.region = ko.observable(region);
	this.selected = ko.observable(true);

	this.changeCountry = function(newCountry) {
		self.country(newCountry);
        var equivalentRegion = null;
        if (self.region()) {
            equivalentRegion = newCountry.regions().find(function(r) { 
                return r.name == self.region().name 
            });
        }
        self.region(equivalentRegion);
	};
}
