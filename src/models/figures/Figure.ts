import { Colors } from "../Colors";
// @ts-ignore
import logo from "../../assets/black-bishop.png";
import { Cell } from "../Cell";
import { Board } from "../Board";

export enum FiguresNames {
  FIGURE = "Фигура",
  KING = "Король",
  PAWN = "Пешка",
  QUEEN = "Ферзь",
  BISHOP = "Слон",
  ROOK = "Ладья",
  KNIGHT = "Конь",
}

export class Figure {
  color: Colors;
  logo: typeof logo | null;
  cell: Cell;
  name: FiguresNames;
  id: number;
  board: Board;

  constructor(color: Colors, cell: Cell, board: Board) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.logo = null;
    this.name = FiguresNames.FIGURE;
    this.id = Math.random();
    this.board = board
  }

  canMove(target: Cell): boolean {
    if (target.figure?.color === this.color)
      return false;
    return target.figure?.name !== FiguresNames.KING;
  }

  moveFigure(target: Cell) {

  }
}