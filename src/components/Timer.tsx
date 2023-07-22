import React, {FC, useEffect} from 'react';
import {Colors} from "../models/Colors";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {timerSlice} from "../store/reducers/TimerSlice";

interface TimerProps {
  color: Colors;
  setModal: (value: boolean) => void;
  setLooser: (value: string) => void;
}
const Timer: FC<TimerProps> = ({color, setModal, setLooser}) => {

  const [paused, setPaused] = React.useState(false);
  const {blackMinutes, blackSeconds} = useAppSelector(state => state.timerReducer);
  const {whiteMinutes, whiteSeconds} = useAppSelector(state => state.timerReducer);
  const {currentPlayer} = useAppSelector(state => state.playerReducer);
  const {setWhiteMinutes, setWhiteSeconds} = timerSlice.actions;
  const {setBlackMinutes, setBlackSeconds} = timerSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const callback = currentPlayer?.color === Colors.BLACK
      ? decrementBlackTimer
      : decrementWhiteTimer;
    const timerID = setInterval(callback, 1000);
    return () => clearInterval(timerID);
  });

  function decrementBlackTimer() {
    if (blackMinutes === 0 && blackSeconds === 0) {
      setModal(true)
      setLooser("Black")
    } else if (blackSeconds === 0) {
      dispatch(setBlackMinutes(blackMinutes - 1))
      dispatch(setBlackSeconds(59))
    } else {
      dispatch(setBlackSeconds(blackSeconds - 1))
    }
  }

  function decrementWhiteTimer() {
    if (whiteMinutes === 0 && whiteSeconds === 0) {
      setModal(true)
      setLooser("White")
    } else if (whiteSeconds === 0) {
      dispatch(setWhiteMinutes(whiteMinutes - 1))
      dispatch(setWhiteSeconds(59))
    } else {
      dispatch(setWhiteSeconds(whiteSeconds - 1))
    }
  }

  return (
    <>
      {color === Colors.WHITE
        ? <div className="time">
          <p>{`${whiteMinutes.toString().padStart(2, '0')}:${whiteSeconds.toString().padStart(2, '0')}`}</p>
        </div>

        : <div className="time">
          <p>{`${blackMinutes.toString().padStart(2, '0')}:${blackSeconds.toString().padStart(2, '0')}`}</p>
        </div>
      }
    </>
  );
};

export default Timer;