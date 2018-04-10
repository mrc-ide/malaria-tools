$(function () {
    $(".scenario-bar a").click(function() {
        $(".content-pane").hide();
        $(".section-bar").find(".active").removeClass("active");
        $(".section-bar ul").find("a").first().addClass("active");
        $(".interventions.content-pane").show();
    });
    $(".interventions-nav").click(function() {
        $(".content-pane").hide();
        $(".interventions.content-pane").show();
        $(".section-bar").find(".active").removeClass("active");
        $(this).addClass("active");
    });
    $(".baseline-nav").click(function() {
        $(".content-pane").hide();
        $(".baseline.content-pane").show();
        $(".section-bar").find(".active").removeClass("active");
        $(this).addClass("active");
    });

    $("[data-toggle='toggle']").click(function() {
        var selector = $(this).data("target");
        $(selector).addClass('in');
        $(this).closest("ul").find("a").removeClass("active");
        $(this).addClass("active");
    });
});

