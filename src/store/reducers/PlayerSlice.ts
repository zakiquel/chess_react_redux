import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Players {
  whitePlayer: Player,
  blackPlayer: Player,
  currentPlayer: Player | null
}

const initialState: Players = {
  whitePlayer: new Player(Colors.WHITE),
  blackPlayer: new Player(Colors.BLACK),
  currentPlayer: null
}

export const playerSlice = createSlice({
  name: "Players",
  initialState,
  reducers: {
    setCurrentPlayer(state, action: PayloadAction<Player>) {
      state.currentPlayer = action.payload;
    }
  }
})

export default playerSlice.reducer;