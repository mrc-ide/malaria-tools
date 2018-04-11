var countries = [
	"Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Cote d'Ivoire", "Democratic Republic of the Congo", "Djibouti", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Malawi", "Mali", "Mauritania", "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of Congo", "Rwanda", "Senegal", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland", "Tanzania", "Togo", "Uganda", "Zambia", "Zimbabwe"
];

function AppModel() {
	var self = this;
	var countryObjects = countries.map(function(x) {
		return new Country(x, ["Region 1", "Region 2", "Region 3", "Region 4"]);
	});

	self.mode = ko.observable('scenario');

	self.countries = ko.observableArray(countryObjects);
	self.scenarios = ko.observableArray([]);

	self.currentScenario = ko.observable();

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
}

function Country(name, regions) {
	this.name = name;
	this.regions = ko.observableArray(regions);
}