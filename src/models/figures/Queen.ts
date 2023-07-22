import { Figure, FiguresNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import {Board} from "../Board";
const blackLogo = require("../../assets/black-queen.png");
const whiteLogo = require("../../assets/white-queen.png");

export class Queen extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FiguresNames.QUEEN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyVertical(target)) return true;
    if (this.cell.isEmptyHorizontal(target)) return true;
    return this.cell.isEmptyDiagonal(target);
  }
}