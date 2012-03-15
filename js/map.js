Crafty.c('Map', {
    width: 0,
    height: 0,
    cells: [],

    map: function(width, height) {
        var i, j;

        this.width = width;
        this.heigth = height;

        for (i = 0; i < width; i++) {
            this.cells[i] = [];

            for (j = 0; j < height; j++) {
                var posX = i * REACH.config.cell.width,
                    posY = j * REACH.config.cell.height - j * (REACH.config.cell.offsetTopY + REACH.config.cell.offsetBottomY),
                    max = 3, min = 0,
                    cellType = Math.floor(Math.random() * (max - min + 1)) + min;

                this.cells[i][j] = Crafty.e('Cell, cell-' + cellType.toString())
                    .attr({x: posX, y: posY, w: REACH.config.cell.width, h: REACH.config.cell.height})
                    .cell(i, j);
            }
        }
        return this;
    },

    displayAccessibleCells: function (visibility) {
        var cellsToHighlight = REACH[REACH.debugCellType] || REACH.accessibleCells;

        console.log('Highlight cells: ' + visibility);
        console.log(cellsToHighlight);

        for (var x = 0; x < cellsToHighlight.length; x++)
        {
            for (var y = 0; y < cellsToHighlight[x].length; y++)
            {
                if(cellsToHighlight[x][y] !== null)
                {
                    var gridX = cellsToHighlight[x][y][0];
                    var gridY = cellsToHighlight[x][y][1];
                    if (visibility)
                    {
                        this.cells[gridX][gridY].highlight();
                    }
                    else
                    {
                        this.cells[gridX][gridY].unhighlight();
                    }
                }
            }
        }
    },
});
