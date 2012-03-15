Crafty.c('Cell', {
    gridX: 0,
    gridY: 0,

    init: function() {
        this.requires('2D, DOM, Mouse')
            .bind('Click', function() {
                if (REACH.accessibleCells[this.gridX][this.gridY] !== null) {
                    var unit = Crafty.e('Unit, ' + REACH.selectedUnit + ', unit-' + REACH.activePlayer.color)
                        .unit(REACH.activePlayer, this.gridX, this.gridY);
                    REACH.activePlayer.units.push(unit);
                    REACH.turn.nextTurn();
                }
            })
            .areaMap(new Crafty.polygon(
                [0, REACH.config.cell.offsetTopY],
                [REACH.config.cell.width, REACH.config.cell.offsetTopY],
                [REACH.config.cell.width, REACH.config.cell.height - REACH.config.cell.offsetBottomY],
                [0, REACH.config.cell.height - REACH.config.cell.offsetBottomY]));

        return this;
    },

    cell: function(gridX, gridY) {
        this.gridX = gridX;
        this.gridY = gridY;
        return this;
    },

    highlight: function() {
        this.sprite(0, REACH.config.cell.height *  REACH.activePlayer.playerNumber, REACH.config.cell.width, REACH.config.cell.height);
    },

    unhighlight: function() {
        this.sprite(0, 0, REACH.config.cell.width, REACH.config.cell.height);
    },
});
