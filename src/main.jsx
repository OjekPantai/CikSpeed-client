import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./stores/store.js";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <div className="antialiased">
      <App />
      <ToastContainer position="bottom-right" />
    </div>
  </Provider>
);
