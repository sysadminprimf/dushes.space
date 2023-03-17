export class Tile {
    constructor(gridElement) {
        this.tileElement = document.createElement("div");
        this.tileElement.classList.add("tile");
        this.value = Math.random() > 0.8 ? 4 : 2;
        this.tileElement.textContent = this.value;
        gridElement.append(this.tileElement);
    }
    
    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty("--x", this.x);
        this.tileElement.style.setProperty("--y", this.y);
    }
}