import {Figure, FiguresNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import {Board} from "../Board";
const blackLogo = require("../../assets/black-king.png");
const whiteLogo = require('../../assets/white-king.png')

export class King extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FiguresNames.KING;
    this.board = board
  }
  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const board1 = this.board.getCopyBoard()
    const dx = Math.abs(this.cell.x - target.x);
    const dy = Math.abs(this.cell.y - target.y);
    if (dx <= 1 && dy <= 1) {
      if (board1.cellIsUnderAttack(target, this.color)) {
        return false;
      }
      return true;
    }
    return false;
  }
  moveFigure(target: Cell) {

  }
}