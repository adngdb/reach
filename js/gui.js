$(document).ready(function() {
    REACH.selectedUnit = 'Unit';
    $('#unit').addClass('selected-unit');

    $('.unit-icon').click(function() {
        REACH.selectedUnit = $(this).attr('data-unit-type');
        $('.unit-icon').removeClass('selected-unit');
        $(this).addClass('selected-unit');
    });
});
