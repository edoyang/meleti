import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { HashRouter } from "react-router";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Provider } from "react-redux"; // Redux provider
import { PersistGate } from "redux-persist/integration/react"; // PersistGate for redux-persist
import { store, persistor } from "./redux/store"; // Import Redux store and persistor

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
