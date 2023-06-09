export class Tile {
    constructor(gridElement) {
        this.tileElement = document.createElement("div");
        this.tileElement.classList.add("tile");
        this.setValue(Math.random() > 0.8 ? 4 : 2);
        gridElement.append(this.tileElement);
    }
    
    setXY(x, y) {
        this.x = x;
        this.y = y;
        this.tileElement.style.setProperty("--x", this.x);
        this.tileElement.style.setProperty("--y", this.y);
    }

    setValue(value) {
        this.value = value;
        this.tileElement.textContent = this.value;
        const bgLightness = 100 - Math.log2(this.value)*9
        this.tileElement.style.setProperty('--bg-lightness', `${bgLightness}%`);
        this.tileElement.style.setProperty('--text-lightness', `${bgLightness < 50 ? 90 : 10}%`);
    }
    removeFromDOM(){
    this.tileElement.remove();
    }

    waitForTransitionEnd(){
        return new Promise(resolve => {
            this.tileElement.addEventListener('transitionend', resolve, {once: true});
        });
    }
}