import { Grid } from "./Grid.js";
import { Tile } from "./Tile.js";

const gridSize = 3;
const gameBoard = document.querySelector(".gameboard");
gameBoard.style.setProperty("--game-size", gridSize);
const grid = new Grid(gameBoard, gridSize);

const newTile = new Tile(gameBoard);
grid.getRandomEmptyCell().linkTile(newTile);

setupInputOnce();

function setupInputOnce() {
    window.addEventListener('keydown', handleInput, {once: true});
}

async function handleInput(event) {
    
    switch(event.key){
        case 'ArrowUp':
            if(!canMoveUp()){
                setupInputOnce();
                return;
            }
            await moveUp();
            break;
        case 'ArrowDown':
            if(!canMoveDown()){
                setupInputOnce();
                return;
            }
            await moveDown();
            break;
        case 'ArrowLeft':
            if(!canMoveLeft()){
                setupInputOnce();
                return;
            }
            await moveLeft();
            break;
        case 'ArrowRight':
            if(!canMoveRight()){
                setupInputOnce();
                return;
            }
            await moveRight();
            break;
        default:
            setupInputOnce();
            return;

    }
    const newTile = new Tile(gameBoard);
    grid.getRandomEmptyCell().linkTile(newTile);
    setupInputOnce();
}


async function slideTiles(groupedCells) {

    const promises = [];

    groupedCells.forEach(group => slideTilesInGroup(group, promises));

    await Promise.all(promises);

    grid.cells.forEach((cell) => {
        cell.hasTileForMerge() && cell.mergeTiles();
    })
}

function slideTilesInGroup(group, promises) {
    for (let i = 1; i < group.length; i++) {
        if(group[i].isEmpty()) {
            continue;
        }

        const cellWithTile = group[i];

        let targetCell;
        let j = i-1;
        while(j >= 0 && group[j].canAccept(cellWithTile.linkedTile)){
            targetCell = group[j];
            j--;
        }

        if(!targetCell) {
            continue;
        }

        promises.push(cellWithTile.linkedTile.waitForTransitionEnd());
        
        if(targetCell.isEmpty()){
            targetCell.linkTile(cellWithTile.linkedTile);
        } else {
            targetCell.linkTileForMerge(cellWithTile.linkedTile);
        }

        cellWithTile.unlinkTile();
    }
}

async function moveUp(){
    await slideTiles(grid.cellsGroupedByColumn);
}

async function moveDown(){
    await slideTiles(grid.cellsGroupedByColumnReverse);
}

async function moveLeft(){
    await slideTiles(grid.cellsGroupedByRow);
}

async function moveRight(){
    await slideTiles(grid.cellsGroupedByRowReverse);
}



function canMoveInGroup(group) {
    return group.some((cell, index) => {
        if(index === 0) {
            return false;
        }
        
        if(cell.isEmpty()){
            return false;
        }
        
        const targetCell = group[index-1];
        return targetCell.canAccept(cell.linkedTile);
    })
}

function canMoveUp() {
    return canMove(grid.cellsGroupedByColumn);
}

function canMove(groupedCells) {
    return groupedCells.some(group => canMoveInGroup(group));
}

function canMoveDown() {
    return canMove(grid.cellsGroupedByColumnReverse);
}
function canMoveLeft() {
    return canMove(grid.cellsGroupedByRow);
}
function canMoveRight() {
    return canMove(grid.cellsGroupedByRowReverse);
}