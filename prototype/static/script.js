$(function () {
    $("#scenarios a").click(function () {

        $(".section-bar").find(".active").removeClass("active");
        $(".section-bar").find("a").first().addClass("active");
        $("#interventions").addClass('active show');
    });

    $("[data-toggle='toggle']").click(function () {
        var selector = $(this).data("target");
        $(selector).addClass('in');
        $(this).closest("ul").find("a").removeClass("active");
        $(this).addClass("active");
    });

    $("[data-toggle='custom-tab']").click(function () {
        var selector = $(this).data("target");
        $('.custom-tabs .tab-pane').removeClass("active show");
        $(selector).addClass('active show');
        $('.form-group').removeClass("active");
        $(this).toggleClass("active");
    });

    $(".slider").slider({
        create: function (event, ui) {
            $(this).slider('value', $(this).data('initial'));
        },
        change: function (event, ui) {
            var selector = $(this).data("control");
            $(selector)
                .val(ui.value);
        }
    });

    $("[data-role=slider-value]").change(function (e) {
        var selector = $(this).data("target");
        var slider = $(selector);
        if (e.target.value !== slider.slider("value"))
            slider.slider("value", e.target.value)
    });

    const myLineChart = new Chart($('#seasonal'), {
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
                display: true,
                position: "left"
            }
        }
    });

    const myPieChart = new Chart($('#vectors'), {
        type: 'pie',
        data: {
            datasets: [{
                data: [20, 0, 80],
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"],
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
                display: true,
                position: "left"
            }
        }
    });

});

