import React, {FC} from "react";
import LostFigures from "./LostFigures";
import {Board} from "../models/Board";
import RestartButton from "./UI/RestartButton/RestartButton";
import {Colors} from "../models/Colors";
import Timer from "./Timer";

interface GameInfoProps {
  board: Board;
  restart: () => void;
  setModal: (value: boolean) => void;
  setLooser: (value: string) => void;
}

const GameInfo: FC<GameInfoProps> = ({board, restart, setModal, setLooser}) => {
  return (
    <div className="game__info">
      <Timer color={Colors.BLACK} setModal={setModal} setLooser={setLooser}/>
      <LostFigures figures={board.lostWhiteFigures}/>
      <RestartButton restart={restart}/>
      <LostFigures figures={board.lostBlackFigures}/>
      <Timer color={Colors.WHITE} setModal={setModal} setLooser={setLooser}/>
    </div>
  );
};

export default GameInfo;