$(function () {
    ko.applyBindings(new AppModel());

    $("[data-toggle='custom-tab']").click(function () {
        var selector = $(this).data("target");
        $('.custom-tabs .tab-pane').removeClass("active show");
        $(selector).addClass('active show');
        $('.form-group').removeClass("active");
        $(this).toggleClass("active");
    });


    $('.nav-item').on('mouseover', function(){
        $(this).addClass('focus');
    });

    $('.nav-item').on('mouseout', function(){
        $(this).removeClass('focus');
    });
});