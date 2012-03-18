$(document).ready(function() {
    REACH.selectedUnit = 'Unit';
    $('#unit').addClass('selected-unit');

    $('.unit-icon').click(function() {
        REACH.selectedUnit = $(this).attr('data-unit-type');
        REACH.selectedUnitSprite = $(this).attr('id');
        $('.unit-icon').removeClass('selected-unit');
        $(this).addClass('selected-unit');
    });
});
