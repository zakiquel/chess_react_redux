import React, { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import CellComponent from "./CellComponent";
import { Cell } from "../models/Cell";
import {useAppSelector} from "../hooks/redux";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, swapPlayer}) => {

  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
  const {currentPlayer} = useAppSelector(state => state.playerReducer)

  function click(cell: Cell) {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer()
      setSelectedCell(null);
    } else {
      if (cell.figure && cell.figure?.color === currentPlayer?.color)
        setSelectedCell(cell);
    }
  }

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  function highlightCells() {
    board.highlightCells(selectedCell);
    updateBoard();
  }

  function
  updateBoard() {
    const newBoard = board.getCopyBoard();
    newBoard.lostBlackFigures = board.lostBlackFigures
    newBoard.lostWhiteFigures = board.lostWhiteFigures
    setBoard(newBoard);
  }

  return (
    <div className="board">
      {board.cells.map((row, index) => (
        <React.Fragment key={index}>
          {row.map((cell) => (
            <CellComponent
              click={click}
              cell={cell}
              key={cell.id}
              selected={
                cell.x === selectedCell?.x && cell.y === selectedCell?.y
              }
              setSelected={setSelectedCell}
              board={board}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
