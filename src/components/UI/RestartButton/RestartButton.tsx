import React, {FC} from 'react';
// @ts-ignore
import classes from "./RestartButton.module.css"
interface ButtonProps {
  restart: () => void;
}

const RestartButton: FC<ButtonProps> = ({restart}) => {
  return (
    <button className={classes.button} onClick={restart}>
      <a>RESTART</a>
    </button>
  );
};

export default RestartButton;