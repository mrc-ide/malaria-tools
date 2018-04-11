$(function () {
    ko.applyBindings(new AppModel());

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

});

