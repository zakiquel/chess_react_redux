import React, {FC} from 'react';
// @ts-ignore
import classes from "./DefeatModal.module.css"

interface DefeatModalProps {
  visible: boolean,
  setVisible: (value: boolean) => void,
  restart: () => void,
  looser: string
}
const DefeatModal: FC<DefeatModalProps> = ({visible, setVisible, restart, looser}) => {

  const rootClasses = [classes.DefeatModal]
  if (visible) {
    rootClasses.push(classes.active)
  }

  return (
    <div className={rootClasses.join(' ')}>
      <div className={classes.DefeatModalContent}>
        <div className={classes.text}>Time is over! {looser} lost.</div>
        <button className={classes.modalButton} onClick={() => {restart(); setVisible(false);}}>Restart</button>
      </div>
    </div>
  );
};

export default DefeatModal;