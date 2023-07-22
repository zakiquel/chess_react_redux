import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const store = setupStore();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
  <App />
  </Provider>
);

// Надо ещё подумать как:
// - Реализовать проход пешки в ферзи (ладью, слона и коня)
// - Взятие пешки на проходе (После первого хода на две клетки, пешку может взять вражеская пешка, пройдя за её "спиной" )
// - Рокировку в длинную и короткую сторону