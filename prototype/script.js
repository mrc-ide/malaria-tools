$(function () {
    $(".scenario-bar a").click(function () {
        $(".content-pane").removeClass("in");
        $(".section-bar").find(".active").removeClass("active");
        $(".section-bar ul").find("a").first().addClass("active");
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
        value: 26,
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

});

