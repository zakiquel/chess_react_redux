import {Figure, FiguresNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import {Board} from "../Board";
const blackLogo = require("../../assets/black-rook.png");
const whiteLogo = require('../../assets/white-rook.png')

export class Rook extends Figure {
  constructor(color: Colors, cell: Cell, board: Board) {
    super(color, cell, board);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
    this.name = FiguresNames.ROOK
    this.board = board
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false
    }
    if (this.cell.isEmptyVertical(target)) return true;
    return (this.cell.isEmptyHorizontal(target));
  }
}