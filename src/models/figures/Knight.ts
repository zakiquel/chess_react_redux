import {Figure, FiguresNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import {Board} from "../Board";
const blackLogo = require("../../assets/black-knight.png");
const whiteLogo = require("../../assets/white-knight.png");

export class Knight extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FiguresNames.KNIGHT
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    const dx = Math.abs(this.cell.x - target.x)
    const dy = Math.abs(this.cell.y - target.y)

    return ((dx === 1 && dy === 2) || (dy === 1 && dx === 2));
  }
}