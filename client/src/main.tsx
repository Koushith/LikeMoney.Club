import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

import "./index.css";

import { UserProvider } from "./context/user.context.tsx";
import { store } from "./redux/store/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
