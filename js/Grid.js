import { Cell } from "./Cell.js";

export class Grid {
    constructor(gridElement, gridSize) {
        this.cells = [];
        for (let i = 0; i < gridSize*gridSize; i++) {
            this.cells.push(
                new Cell(gridElement, i % gridSize, Math.floor(i / gridSize))
            );
        }
        this.cellsGroupedByColumn = this.groupCellsByColumn();
        this.cellsGroupedByRow = this.groupCellsByRow();
        this.cellsGroupedByColumnReverse = this.cellsGroupedByColumn.map(column => [...column].reverse());
        this.cellsGroupedByRowReverse = this.cellsGroupedByRow.map(row => [...row].reverse());

    }

    getRandomEmptyCell(){
        const emptyCells = this.cells.filter(cell => cell.isEmpty());
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    groupCellsByColumn() {
        return this.cells.reduce((groupedCells, cell) => {
            groupedCells[cell.x] = groupedCells[cell.x] || [];
            groupedCells[cell.x][cell.y] = cell;
            return groupedCells;
        }, [])
    }

    groupCellsByRow() {
        return this.cells.reduce((groupedCells, cell) => {
            groupedCells[cell.y] = groupedCells[cell.y] || [];
            groupedCells[cell.y][cell.x] = cell;
            return groupedCells;
        }, [])
    }
}