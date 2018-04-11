function Results() {
	var self = this;

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
		$.each($('.prevalence'), function() { 
			renderChart(this, "Prevalence", "? Unknown ?"); 
		});
		$.each($('.prevalence0-5'), function() { 
			renderChart(this, "Prevalence 0-5", "? Unknown ?"); 
		});
		$.each($('.clinical-incidence'), function() { 
			renderChart(this, "Clinical incidence", "? Unknown ?"); 
		});
		$.each($('.severe-incidence'), function() { 
			renderChart(this, "Severe disease incidence", "? Unknown ?"); 
		});
		$.each($('.mortality'), function() { 
			renderChart(this, "Mortality", "? Unknown ?");
		});
		$.each($('.eir'), function() { 
			renderChart(this, "Entomological innoculation rate", "? Unknown ?"); 
		});
	};
}
