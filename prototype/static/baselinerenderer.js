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

    var drawPastITN = function() {
        $.each($('.past-itn'), function () {
            new Chart($(this), {
                type: 'line',
                data: {
                    labels: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
                    datasets: [{
                        borderColor: "#3e95cd",
                        data: [2, 3, 3, 3, 7, 16, 21, 20, 17, 13, 15, 26]
                    }]
                },
                options: {
                    title: {
                        text: "Past ITN usage",
                        display: true
                    },
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "?? (probably %)"
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Year"
                            }
                        }]
                    }
                }
            });
        });
    };

    self.render = function(region) {
        drawLine();
        drawPie(region);
        drawPastITN();
    };
}
