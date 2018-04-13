function BaselineRenderer() {
	var self = this;
    var drawLine = function () {
        $.each($('.seasonal'), function () {
            new Chart($(this), {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    datasets: [{
                        label: 'rainfall',
                        borderColor: "#3e95cd",
                        data: [12, 19, 15, 13, 10, 3, 2, 2, 4, 7, 11, 14]
                    },
                        {
                            label: 'incidence',
                            borderColor: "#8e5ea2",
                            data: [11, 12, 18, 15, 13, 9, 4, 3, 3, 5, 8, 12]
                        }]
                },
                options: {
                    title: {
                        text: "Seasonal characteristics",
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "??"
                            }
                        }]
                    }
                }
            });
        })
    };

    var pieChart = null;

    var drawPie = function(region) {
        var vectors = region.vectors();
        if (self.pieChart){
            self.pieChart.destroy();
        }
        $.each($('.vectors'), function () {
            self.pieChart = new Chart($(this), {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [vectors.f(), vectors.a(), vectors.g()],
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f"]
                    }],

                    labels: [
                        'Funestus',
                        'Arabiensis',
                        'Gambiae'
                    ]
                },
                options: {
                    title: {
                        text: "Vectors",
                        display: true
                    }
                }
            });
        })
    };

    var drawPastITN = function(years) {

        var fakeDataPoints = years.map(x => 30 + Math.floor(Math.random() * Math.floor(70)));

        $.each($('.itn'), function () {

            new Chart($(this), {
                type: 'horizontalBar',
                data: {
                    labels: years,
                    datasets: [{
                        data: fakeDataPoints,
                        label: 'coverage',
                        backgroundColor: "#ffce56",
                    }]
                },
                options: {
                    title: {
                        text: "Historical ITN use",
                        display: true,
                        position: "top"
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0,
                                max: 100
                            }
                        }]
                    }
                }
            });
        })
    };

    self.render = function(region, years) {
        drawLine();
        drawPie(region);
        drawPastITN(years);
    };
}
