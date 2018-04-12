function Results(app) {
    var self = this;

    self.graphs = ko.observableArray([
        new ResultsGraph("prevalence", "Prevalence"),
        new ResultsGraph("prevalence0-5", "Prevalence 0-5"),
        new ResultsGraph("clinical-incidence", "Clinical incidence"),
        new ResultsGraph("severe-incidence", "Severe disease incidence"),
        new ResultsGraph("mortality", "Mortality"),
        new ResultsGraph("eir", "Entomological innoculation rate")
    ]);
    self.currentGraph = ko.observable(self.graphs()[0]);

    self.selectGraph = function(graph) {
        self.currentGraph(graph);
        self.render();
    };

    var randomDataSeries = function(seed, length) {
        var points = [];
        var x = seed;
        var i = 0;
        while (i < length) {
            x += (Math.random() * 5 - 2.5);
            points.push(x)
            i++;
        }
        return points;
    }

    var renderChart = function(target, scenarios, yLabel, xLabel) {
        var colors = [
            "#4D4D4D",
            "#5DA5DA",
            "#FAA43A",
            "#60BD68",
            "#F17CB0",
            "#B2912F",
            "#B276B2",
            "#DECF3F",
            "#F15854"
        ];
        var datasets = scenarios.map(function(s, i) {
            return {
                label: s.name(),
                borderColor: colors[i],
                backgroundColor: "rgba(0,0,0,0)",
                data: randomDataSeries(20, 12)
            };
        });

        return new Chart($(target), {
            type: 'line',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: datasets
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: yLabel
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: xLabel
                        }
                    }]
                }
            }
        });
    }


    self.render = function() {
        var metadata = self.currentGraph();
        $.each($("#" + metadata.id()), function() { 
            renderChart(this, app.selectedScenarios(), metadata.name(), "? Unknown ?"); 
        });
    };
}

function ResultsGraph(id, name) {
    this.id = ko.observable(id);
    this.name = ko.observable(name);
}