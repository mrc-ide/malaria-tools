function Scenario(name, country, region) {
	this.name = ko.observable(name);
	this.country = ko.observable(country);
	this.region = ko.observable(region);
	this.selected = ko.observable(true);
}
