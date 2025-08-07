import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css"
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./services/store.ts";
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store} >
      <StrictMode>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </StrictMode> ,
    </Provider>
  </BrowserRouter>
);
