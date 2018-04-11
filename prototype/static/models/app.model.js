var countries = [
	"Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cameroon", "Central African Republic", "Chad", "Cote d'Ivoire", "Democratic Republic of the Congo", "Djibouti", "Equatorial Guinea", "Eritrea", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Malawi", "Mali", "Mauritania", "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of Congo", "Rwanda", "Senegal", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Swaziland", "Tanzania", "Togo", "Uganda", "Zambia", "Zimbabwe"
];

function AppModel() {
	this.countries = ko.observableArray(countries.map(function(x) {
		return new Country(x, ["Region 1", "Region 2", "Region 3", "Region 4"]);
	}));
	this.newScenario = new NewScenario();
	this.currentCountry = ko.observable(new Country("", []));
}

function Country(name, regions) {
	this.name = name;
	this.regions = ko.observableArray(regions);
}

function NewScenario() {
	this.selectedCountry = ko.observable();
	this.selectedRegion = ko.observable();
}