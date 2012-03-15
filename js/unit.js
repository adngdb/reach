Crafty.c('Unit', {
    gridX: 0,
    gridY: 0,
    healthPoint: 15,
    attackValue: 10,
    moveY: 1,
    player: null,

    init: function() {
        return this.requires('2D, DOM');
    },

    unit: function(player, gridX, gridY) {
        this.player = player;
        this.gridX = gridX;
        this.gridY = gridY;
        this.updatePosition();
        return this;
    },

    updatePosition: function() {
        this.x = this.gridX * REACH.config.cell.width;
        this.y = this.gridY * REACH.config.cell.height - this.gridY * (REACH.config.cell.offsetTopY + REACH.config.cell.offsetBottomY);
        this.w = REACH.config.cell.width;
        this.h = REACH.config.cell.height;
    },

    moveForward: function() {
        var direction = 1;
        if (this.player.playerNumber === 1) {
            direction = -1;
        }

        if (REACH.ennemyUnits[ this.gridX ][ this.gridY + direction * this.moveY  ] !== null
            || REACH.friendlyUnits[ this.gridX ][ this.gridY + direction * this.moveY  ] !== null) {
            return false;
        }

        this.gridY = this.gridY + direction * this.moveY;

        if ((this.player.playerNumber === 1 && this.gridY === 0) ||
            (this.player.playerNumber === 2 && this.gridY === REACH.config.height - 1)) {
            this.player.increasePoints();
            this.die();
            return null;
        }

        this.updatePosition();

        return true;
    },

    attack: function() {
        var reachableCells = this.getListOfReachableCells();
        for (var i = 0; i < reachableCells.length; i++)
        {
            var ennemyUnit = REACH.ennemyUnits[ reachableCells[i][0] ][ reachableCells[i][1]  ];
            if (ennemyUnit !== null) {
                ennemyUnit.healthPoint -= this.attackValue;
                if (ennemyUnit.healthPoint <= 0) {
                    ennemyUnit.die();
                }
            }
        }
    },

    die: function() {
        this.player.units.splice(this.player.units.indexOf(this), 1);
        this.destroy();
    },

    getListOfAccessibleCells: function() {
        var yDelta = -1;
        var accessibleCells = [];
        if (this.player.playerNumber === 1) {
            yDelta = 1;
        }

        if (this.gridY + yDelta >= 0 && this.gridY + yDelta < REACH.config.height) {
            accessibleCells.push([this.gridX, this.gridY + yDelta]);
        }

        if (this.gridX > 0) {
            accessibleCells.push([this.gridX - 1, this.gridY]);
        }
        if (this.gridX < REACH.config.width - 1) {
            accessibleCells.push([this.gridX + 1, this.gridY]);
        }

        return accessibleCells;
    },

    getListOfInaccessibleCells: function() {
        var inaccessibleCells = [];

        if (this.gridX > 0) {
            inaccessibleCells.push([this.gridX - 1, this.gridY]);
        }
        if (this.gridX < REACH.config.width - 1) {
            inaccessibleCells.push([this.gridX + 1, this.gridY]);
        }
        if (this.gridY > 0) {
            inaccessibleCells.push([this.gridX, this.gridY - 1]);
        }
        if (this.gridY < REACH.config.height - 1) {
            inaccessibleCells.push([this.gridX, this.gridY + 1]);
        }

        return inaccessibleCells;
    },

    getListOfReachableCells: function() {
        return this.getListOfInaccessibleCells();
    }
});

Crafty.c('SideUnit', {
    healthPoint: 10,
    attackValue: 10,
    moveY: 1,

    getListOfReachableCells: function() {
        var reachableCells = [];

        if (this.gridX > 0) {
            reachableCells.push([this.gridX - 1, this.gridY]);
        }
        if (this.gridX > 1) {
            reachableCells.push([this.gridX - 2, this.gridY]);
        }
        if (this.gridX < REACH.config.height - 1) {
            reachableCells.push([this.gridX + 1, this.gridY]);
        }
        if (this.gridX < REACH.config.height - 2) {
            reachableCells.push([this.gridX + 2, this.gridY]);
        }

        return reachableCells;
    }
});

Crafty.c('HeavyUnit', {
    healthPoint: 20,
    attackValue: 5,
    moveY: 0,
});
