(function(Crafty, REACH) {

    var generateSpawnCells = function(playerNumber) {
        var indexY, indexX,
            spawnCells = [];
        if (playerNumber === 1) {
            indexY = REACH.config.height - 1;
        }
        else {
            indexY = 0;
        }

        for (indexX = 0; indexX < REACH.config.width; indexX++) {
            spawnCells.push([indexX, indexY]);
        }

        return spawnCells;
    }

    var Player = function() {
        this.color = 'black';
        this.playerNumber = 0;
        this.spawnCells = null;
        this.units = null;
        this.points = 0;
    };

    Player.prototype = {
        player: function(playerNumber) {
            this.units = [];
            this.playerNumber = playerNumber;
            if (playerNumber === 1) {
                this.color = 'blue';
            }
            else if (playerNumber === 2) {
                this.color = 'orange';
            }
            else {
                throw 'Player number out of range!';
            }
            this.spawnCells = generateSpawnCells(this.playerNumber);
            return this;
        },

        getListOfAccessibleCells: function() {
            return this.spawnCells;
        },

        increasePoints: function() {
            this.points++;
            if (this.points >= REACH.config.pointsToWin) {
                REACH.win(this);
            }
        },
    };

    Crafty.c('Player', new Player());

})(window.Crafty, window.REACH);
