function Scenario(name, country, region) {
	var self = this;
	self.name = ko.observable(name);
	self.country = ko.observable(country);
	self.region = ko.observable(region);
}