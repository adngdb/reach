$(document).ready(function() {
    REACH.selectedUnit = 'Unit';
    $('#unit').addClass('selected-unit');

    $('.unit-icon').click(function() {
        REACH.selectedUnit = $(this).attr('data-unit-type');
        REACH.selectedUnitSprite = $(this).attr('id');
        $('.unit-icon').removeClass('selected-unit');
        $(this).addClass('selected-unit');
    });

    $('#unit').simpletip({
        'content': 'A basic unit, can hit ennemies on all cells around it. Moves one case forward each turn, middle attack strength, good defense.',
        'fixed': false
    });
    $('#side-unit').simpletip({
        'content': 'A unit with a lower defense and that cannot hit units in front of it, but that can hit units 2 cells away on each side.',
        'fixed': false
    });
    $('#heavy-unit').simpletip({
        'content': 'A heavy unit with a very good defense but lower attack power. It cannot move.',
        'fixed': false
    });

    REACH.updateUI = function(turn) {
        var activePlayer = turn.getActivePlayer(),
            inactivePlayer = turn.getInactivePlayer(),
            active = $('#player-' + activePlayer.playerNumber),
            inactive = $('#player-' + inactivePlayer.playerNumber);

        active.addClass('active');
        inactive.removeClass('active');

        active.children('.player-score').children('span').text(activePlayer.points);
        inactive.children('.player-score').children('span').text(inactivePlayer.points);
    };

});
