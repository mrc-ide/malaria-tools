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

    $("#slider").slider({
        value: 26,
        change: function (event, ui) {
            $("#coverage")
                .val(ui.value);
        }
    });

    $("#coverage").change(function (e) {
        if (e.target.value !== $('#slider').slider("value"))
            $('#slider').slider("value", e.target.value)
    });

    $(".checkbox-label, input[type='checkbox']").click(function(){
        $('.form-group').removeClass("active");
        $(this).closest(".form-group").toggleClass("active");
    })
});

