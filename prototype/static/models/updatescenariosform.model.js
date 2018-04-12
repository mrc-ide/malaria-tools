function UpdateScenariosForm(app) {
	var self = this;
	self.app = ko.observable(app);
	self.intendedScenario = ko.observable();
	self.scenarios = ko.observableArray();
	self.originalCountry = ko.observable();
	self.newCountry = ko.observable();

	self.setup = function(intendedScenario, scenarios, originalCountry, newCountry) {
		self.intendedScenario(intendedScenario);
		self.scenarios(scenarios.map(function(s) {
			return new SelectableScenario(s);
		}));
		self.originalCountry(originalCountry);
		self.newCountry(newCountry);
		$("#update-scenarios").modal();
	};
	self.updateScenarios = function() {
		self.scenarios().filter(function(s) {
			return s.selected();
		}).forEach(function(s) {
			s.scenario().changeCountry(self.newCountry());
		});
	};

	self.originalCountryName = ko.computed(function() {
		if (this.originalCountry()) {
			return this.originalCountry().name;
		} else {
			return null;
		}
	}, self);

	self.newCountryName = ko.computed(function() {
		if (this.newCountry()) {
			return this.newCountry().name;
		} else {
			return null;
		}
	}, self);

	self.intendedScenarioName = ko.computed(function() {
		if (this.intendedScenario()) {
			return this.intendedScenario().name();
		} else {
			return null;
		}
	}, self);
};

function SelectableScenario(scenario) {
	var self = this;
	self.scenario = ko.observable(scenario);
	self.selected = ko.observable(true);

	self.name = ko.computed(function() {
		return this.scenario().name();
	}, self);

	self.toggle = function() {
		self.selected(!self.selected());
	};
}
