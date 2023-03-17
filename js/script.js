import { Grid } from "./Grid.js";
import { Tile } from "./Tile.js";

const gridSize = 4;
const gameBoard = document.querySelector(".gameboard");
gameBoard.style.setProperty("--game-size", gridSize);
const grid = new Grid(gameBoard, gridSize);

grid.getRandomEmptyCell().linkTile(new Tile(gameBoard));