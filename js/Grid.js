import { Cell } from "./Cell.js";

export class Grid {
    constructor(gridElement, gridSize) {
        this.cells = [];
        for (let i = 0; i < gridSize*gridSize; i++) {
            this.cells.push(
                new Cell(gridElement, i % gridSize, Math.floor(i / gridSize))
            );
        }
    }

    getRandomEmptyCell(){
        const emptyCells = this.cells.filter(cell => cell.isEmpty());
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }
}