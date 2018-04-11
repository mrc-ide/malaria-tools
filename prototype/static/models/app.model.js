var countries = [
	"Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Cote d'Ivoire", "Democratic Republic of the Congo", "Djibouti", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Malawi", "Mali", "Mauritania", "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of Congo", "Rwanda", "Senegal", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland", "Tanzania", "Togo", "Uganda", "Zambia", "Zimbabwe"
];

function AppModel() {
	var self = this;
	var countryObjects = countries.map(function(x) {
		return new Country(x, ["Region 1", "Region 2", "Region 3", "Region 4"]);
	})
	this.countries = ko.observableArray(countryObjects);
	this.newScenario = ko.observable(new NewScenario(countryObjects));
	this.currentCountry = ko.observable(this.countries()[0]);
	this.selectedCountry = ko.observable(this.countries()[0]);
	this.newCountry = ko.computed(function(){
		return new Country(self.selectedCountry().name + "-1",  ["Region 1", "Region 2", "Region 3", "Region 4"])
	})
}

function Country(name, regions) {
	this.name = name;
	this.regions = ko.observableArray(regions);
}

function NewScenario(countries) {
	var self = this;
	self.countries = ko.observableArray(countries);
	self.selectedCountry = ko.observable();
	self.selectedRegion = ko.observable();
	self.name = ko.observable();

	self.selectCountry = function(country, event) {
		self.selectedCountry(country);
		self.selectedRegion(null);
		var item = $(event.target).closest("li");
		item.closest("ul").find(".collapse").collapse("hide");
		item.find(".collapse").collapse("show");
	};

	self.selectRegion = function(region) {
		self.selectedRegion(region);
	}

	self.isActive = function(countryOrRegion) {
		if (self.selectedRegion()) {
			return self.selectedRegion() == countryOrRegion;
		} else if (self.selectedCountry()) {
			return self.selectedCountry() == countryOrRegion;
		} else {
			return false;
		}
	}

	self.isValid = ko.computed(function() {
		return this.name() && this.selectedCountry();
	}, this);
}