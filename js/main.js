$(document).ready(function() {
    var stageHeight = REACH.config.height * REACH.config.cell.height,
        stageWidth = REACH.config.width * REACH.config.cell.width,
        i;

    // create a function to call when a player wins
    REACH.win = function(player) {
        alert('Player ' + player.playerNumber + ' won!');
        REACH.map.displayAccessibleCells(false);
        Crafty.scene('game');
    };

    REACH.updateUI = function(turn) {
        $('#current-player').text(turn.getActivePlayer().playerNumber);
    };

    REACH.debug = function(cellTypeToDisplay) {
        if (typeof cellTypeToDisplay === undefined || cellTypeToDisplay === false) {
            cellTypeToDisplay = null;
        }
        REACH.map.displayAccessibleCells(false);
        REACH.debugCellType = cellTypeToDisplay;
        REACH.turn.startTurn();
    };

    Crafty.init(stageWidth, stageHeight);

    Crafty.scene('loading', function() {
        Crafty.background('#fff');
        Crafty.e('2D, DOM, Text').attr({ w: 100, h: 20, x: 150, y: 120 })
                .text('Loading')
                .css({ 'text-align': 'center' });
    });

    Crafty.scene('game', function() {
        Crafty.sprite(1, 'img/sprites.png', {
            'cell-0': [0, 0],
            'cell-1': [REACH.config.cell.width, 0],
            'cell-2': [2 * REACH.config.cell.width, 0],
            'cell-3': [3 * REACH.config.cell.width, 0],
            'unit-orange': [4 * REACH.config.cell.width, 0],
            'unit-blue': [4 * REACH.config.cell.width, REACH.config.cell.height],
        });

        var map = REACH.map = Crafty.e('Map').map(REACH.config.width, REACH.config.height);

        var turn = REACH.turn = Crafty.e('Turn');
        turn.clear();

        var players = [];
        for (i = 0; i < 2; i++) {
            players[i] = Crafty.e('Player').player(i + 1);
        }

        turn.players = players;
        turn.startTurn();
    });

    Crafty.scene('game');
});
