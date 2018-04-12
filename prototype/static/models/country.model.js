function Country(name, regions, editable) {
    this.name = name;
    this.regions = ko.observableArray(regions);
    this.editable = editable;
}

function Region(name, year, ageStart, ageEnd, vectors) {
    var self = this;
    this.name = name;
    this.year = ko.observable(year);
    this.ageStart = ko.observable(ageStart);
    this.ageEnd = ko.observable(ageEnd);
    this.vectors = ko.observable(vectors);
    this.validVectors = ko.computed(function () {
        var total = parseInt(self.vectors().f())
            + parseInt(self.vectors().a())
            + parseInt(self.vectors().g());

        return total === 100;
    });
}