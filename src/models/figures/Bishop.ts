import { Figure, FiguresNames } from "./Figure";
import { Colors } from "../Colors";
import { Cell } from "../Cell";
import {Board} from "../Board";

const blackLogo = require("../../assets/black-bishop.png");
const whiteLogo = require("../../assets/white-bishop.png")
export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FiguresNames.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    return this.cell.isEmptyDiagonal(target);
  }
}