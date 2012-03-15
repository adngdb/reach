(function(Crafty, REACH) {

    var getEmptyCellsMatrix = function(width, height) {
        var i, j, matrix = [];

        for (i = 0; i < width; i++) {
            matrix[i] = [];
            for (j = 0; j < height; j++) {
                matrix[i][j] = null;
            }
        }

        return matrix;
    };

    Crafty.c('Turn', {
        current: 0,
        players: [],

        turn: function() {
            return this;
        },

        getActivePlayer: function() {
            return this.players[ this.current % 2 ];
        },

        getInactivePlayer: function() {
            return this.players[ (this.current + 1) % 2 ];
        },

        generateMatrixOfAccessibleCells: function() {
            var player = this.getActivePlayer(),
                inactivePlayer = this.getInactivePlayer(),
                units = player.units,
                accessibleCells = getEmptyCellsMatrix(REACH.config.width, REACH.config.height),
                u, unit, cells, c, cell;

            // get 1. list of cells made accessible by active player's units
            for (u in units) {
                unit = units[u];
                cells = unit.getListOfAccessibleCells();

                for (c in cells) {
                    cell = cells[c];
                    accessibleCells[ cell[0] ][ cell[1] ] = cell;
                }
            }

            // get 2. list of cells made unaccessible by non-active player's units
            units = inactivePlayer.units;
            for (u in units) {
                unit = units[u],
                cells = unit.getListOfInaccessibleCells();

                for (c in cells) {
                    cell = cells[c];
                    accessibleCells[ cell[0] ][ cell[1] ] = null;
                }
            }

            // get 3. list of spawning cells of active player
            cells = player.getListOfAccessibleCells();
            for (c in cells) {
                cell = cells[c];
                accessibleCells[ cell[0] ][ cell[1] ] = cell;
            }

            // get 4. cells occupied by friendly units
            units = player.units;
            for (u in units) {
                unit = units[u];
                accessibleCells[ unit.gridX ][ unit.gridY ] = null;
            }

            // accessible cells = 1 - 2 + 3 - 4
            return REACH.accessibleCells = accessibleCells;
        },

        generateMatrixOfReachableCells: function() {
            var reachableCells = getEmptyCellsMatrix(REACH.config.width, REACH.config.height),
                player = this.getActivePlayer(),
                units = player.units,
                u, unit, cells, c, cell;

            for (u in units) {
                unit = units[u];
                cells = unit.getListOfReachableCells();
                console.log('Reachable cells: ');
                console.log(cells);
                for (c in cells) {
                    cell = cells[c];
                    reachableCells[cell[0]][cell[1]] = cell;
                }
            }

            return REACH.reachableCells = reachableCells;
        },

        generateMatrixOfEnnemyUnits: function() {
            var ennemyUnits = getEmptyCellsMatrix(REACH.config.width, REACH.config.height),
                player = this.getInactivePlayer(),
                units = player.units,
                u, unit;

            for (u in units) {
                unit = units[u];
                ennemyUnits[unit.gridX][unit.gridY] = unit;
            }

            return REACH.ennemyUnits = ennemyUnits;
        },

        generateMatrixOfFriendlyUnits: function() {
            var friendlyUnits = getEmptyCellsMatrix(REACH.config.width, REACH.config.height),
                player = this.getActivePlayer(),
                units = player.units,
                u, unit;

            for (u in units) {
                unit = units[u];
                friendlyUnits[unit.gridX][unit.gridY] = unit;
            }

            return REACH.friendlyUnits = friendlyUnits;
        },

        move: function() {
            var player = this.getActivePlayer(),
                units = player.units.slice(),
                unit = {},
                res = null;

            for (u in units) {
                unit.gridX = units[u].gridX;
                unit.gridY = units[u].gridY;
                res = units[u].moveForward();
                if (res === null) {
                    // the unit reached the opposite line and disappeared, remove it from the matrix
                    REACH.friendlyUnits[unit.gridX][unit.gridY] = null;
                }
                else if (res === true) {
                    // the unit moved, update it's position
                    REACH.friendlyUnits[unit.gridX][unit.gridY] = null;
                    REACH.friendlyUnits[units[u].gridX][units[u].gridY] = units[u];
                }
            }
            return this;
        },

        attack: function() {
            var player = this.getActivePlayer(),
                units = player.units;

            for (u in units) {
                units[u].attack();
            }
            return this;
        },

        nextTurn: function() {
            // Move units and then make them attack
            this.move().attack();

            // Go to next turn
            this.current++;
            this.startTurn();
        },

        clear: function() {
            REACH.activePlayer = null;
            REACH.accessibleCells = null;
            REACH.reachableCells = null;
            REACH.ennemyUnits = null;
            REACH.friendlyUnits = null;
            return this;
        },

        startTurn: function() {
            REACH.activePlayer = this.getActivePlayer();
            if (typeof REACH.accessibleCells !== undefined && REACH.accessibleCells !== null) {
                REACH.map.displayAccessibleCells(false);
            }
            this.generateMatrixOfAccessibleCells();
            this.generateMatrixOfReachableCells();
            this.generateMatrixOfEnnemyUnits();
            this.generateMatrixOfFriendlyUnits();
            REACH.map.displayAccessibleCells(true);
            REACH.updateUI(this);
        },
    });

})(window.Crafty, window.REACH);
