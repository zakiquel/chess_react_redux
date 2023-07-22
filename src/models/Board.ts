import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Pawn } from "./figures/Pawn";
import { King } from "./figures/King";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { Knight } from "./figures/Knight";
import { Bishop } from "./figures/Bishop";
import { Figure, FiguresNames } from "./figures/Figure";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 === 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null));
        } else row.push(new Cell(this, j, i, Colors.WHITE, null));
      }
      this.cells.push(row);
    }
  }

  cellIsUnderAttack(target: Cell, color: Colors): boolean {
    const direction = color === Colors.WHITE ? 1 : -1;
    for (let i = 0; i < 8; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const cell = row[j];
        if (
          cell.figure &&
          cell.figure.color !== color &&
          cell.figure.canMove(target) &&
          cell.figure.name !== FiguresNames.PAWN
        )
          return true;
        if (
          cell.figure?.name === FiguresNames.PAWN &&
          cell.figure.color !== color &&
          ((target.x === cell.x - 1 && target.y === cell.y + direction) ||
            (target.x === cell.x + 1 && target.y === cell.y + direction))
        )
          return true;
      }
    }
    return false;
  }
  public findKing(color: Colors): Cell | any {
    for (let y = 0; y < 8; y++) {
      const row = this.cells[y];
      for (let x = 0; x < 8; x++) {
        const cell = row[x];
        if (
          cell.figure?.name === FiguresNames.KING &&
          cell.figure?.color === color
        ) {
          console.log(`${color} ${y} ${x}`)
          return this.getCell(x, y)
        }
      }
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < row.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }
  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6), this);
      new Pawn(Colors.BLACK, this.getCell(i, 1), this);
    }
  }
  private addKings() {
    new King(Colors.WHITE, this.getCell(4, 7), this);
    new King(Colors.BLACK, this.getCell(4, 0), this);
  }
  private addQueens() {
    new Queen(Colors.WHITE, this.getCell(3, 7), this);
    new Queen(Colors.BLACK, this.getCell(3, 0), this);
  }
  private addRooks() {
    new Rook(Colors.WHITE, this.getCell(7, 7), this);
    new Rook(Colors.WHITE, this.getCell(0, 7), this);
    new Rook(Colors.BLACK, this.getCell(0, 0), this);
    new Rook(Colors.BLACK, this.getCell(7, 0), this);
  }
  private addKnights() {
    new Knight(Colors.WHITE, this.getCell(1, 7), this);
    new Knight(Colors.WHITE, this.getCell(6, 7), this);
    new Knight(Colors.BLACK, this.getCell(1, 0), this);
    new Knight(Colors.BLACK, this.getCell(6, 0), this);
  }
  private addBishops() {
    new Bishop(Colors.WHITE, this.getCell(2, 7), this);
    new Bishop(Colors.WHITE, this.getCell(5, 7), this);
    new Bishop(Colors.BLACK, this.getCell(2, 0), this);
    new Bishop(Colors.BLACK, this.getCell(5, 0), this);
  }
  public addFigures() {
    this.addPawns();
    this.addKings();
    this.addKnights();
    this.addQueens();
    this.addRooks();
    this.addBishops();
  }
  addLostFigure(figure: Figure) {
    figure.color === Colors.BLACK
      ? this.lostBlackFigures.push(figure)
      : this.lostWhiteFigures.push(figure);
  }
}
