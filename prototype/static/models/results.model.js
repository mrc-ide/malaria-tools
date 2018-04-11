function Results() {
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
    }

    var renderChart = function(target, yLabel, xLabel) {
        return new Chart($(target), {
            type: 'line',
            data: {
                labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                datasets: [
                    {
                        label: 'Scenario 1',
                        borderColor: "#3e95cd",
                        data: [23, 24, 23, 22, 22, 21.5, 23, 23, 22, 20, 24, 19]
                    },
                    {
                        label: 'Scenario 2',
                        borderColor: "#8e5ea2",
                        data: [23, 21, 20, 19, 19, 21, 20, 19, 21, 19, 19, 18]
                    }
                ]
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
            renderChart(this, metadata.name(), "? Unknown ?"); 
        });
    };
}

function ResultsGraph(id, name) {
    this.id = ko.observable(id);
    this.name = ko.observable(name);
}