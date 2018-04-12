function NewCountryForm(app) {
    var self = this;

    self.app = app;
    self.name = ko.observable();
    self.regions = ko.observableArray();

    self.addCountry = function () {
        var country = new Country(self.name(), self.regions(), true);
        self.app.countries.push(country);
        self.app.countries.sort(function (left, right) {
            return left.name < right.name ? -1 : 1
        });

        self.app.currentCountry(country);
        self.app.currentRegion(country.regions()[0]);
        self.app.mode('country');
    };

    self.setup = function(country) {
        self.name(country.name + "-1");
        self.regions(JSON.parse(JSON.stringify(country.regions())));
    }
}