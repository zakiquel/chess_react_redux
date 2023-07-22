import React, {useEffect, useState} from "react";
import "./App.css";
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import GameInfo from "./components/GameInfo";
import DefeatModal from "./components/UI/DefeatModal/DefeatModal";
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {timerSlice} from "./store/reducers/TimerSlice";
import {playerSlice} from "./store/reducers/PlayerSlice";

function App() {
  const dispatch = useAppDispatch();
  const {setWhiteTimer, setBlackTimer} = timerSlice.actions;
  const [board, setBoard] = useState(new Board());
  const {whitePlayer, blackPlayer, currentPlayer} = useAppSelector(state => state.playerReducer)
  const {setCurrentPlayer} = playerSlice.actions;
  const [modal, setModal] = useState(false);
  const [looser, setLooser] = useState("")

  useEffect(() => {
    restart();
    dispatch(setCurrentPlayer(whitePlayer));
  }, []);

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    dispatch(setBlackTimer({min: 0, sec: 30}));
    dispatch(setWhiteTimer({min: 0, sec: 30}));
    dispatch(setCurrentPlayer(whitePlayer));
  }

  function swapPlayer() {
    dispatch(setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer));
  }

  return (
    <div className="app">
      <DefeatModal
        visible={modal}
        setVisible={setModal}
        restart={restart}
        looser={looser}
      />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        swapPlayer={swapPlayer}
      />
      <GameInfo
        setLooser={setLooser}
        board={board}
        restart={restart}
        setModal={setModal}
      />
    </div>
  );
}

export default App;
