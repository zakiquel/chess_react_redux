import React, {FC, useState} from "react";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import {Board} from "../models/Board";

interface CellProps {
  cell: Cell;
  selected: boolean;
  click: (cell: Cell) => void;
  board: Board;
  setSelected: (value: Cell) => void;
}

const CellComponent: FC<CellProps> = ({ cell, selected, click, board, setSelected }) => {

  const [isDrag, setIsDrag] = useState<boolean>(false);

  const dragHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setSelected(cell);
  }

  const dropHandler = (e: React.DragEvent) => {
    click(board.getCell(3, 3));
  }

  const preventHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(true);
  }

  const leaveHandler = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDrag(false);
  }

  return (
    <div
      onDrag={dragHandler}
      onDrop={dropHandler}
      onDragOver={preventHandler}
      onDragLeave={leaveHandler}
      className={[
        isDrag ? "drag" : "",
        "cell",
        cell.color,
        selected && cell.color === Colors.BLACK
          ? "selected__black"
          : selected && cell.color === Colors.WHITE
          ? "selected__white"
          : "",
        cell.available && cell.figure ? "attack__select" : "",
      ].join(" ")}
      onClick={() => click(cell)}
    >
      {cell.available && cell.figure && cell.color === Colors.WHITE && <div className="attack__white"></div>}
      {cell.available && cell.figure && cell.color === Colors.BLACK && <div className="attack__black"></div>}
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo &&
        <img draggable src={cell.figure.logo} />}
    </div>
  );
};

export default CellComponent;
