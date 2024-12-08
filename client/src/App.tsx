import "./App.css";
import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Pomodoro from "./pages/Pomodoro";
import UniversityConnect from "./pages/UniversityConnect";
import University from "./pages/University";
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      <div className="content">
        <Routes>
          <Route path="/login" Component={Login} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" Component={Home} />
            <Route path="/pomodoro" Component={Pomodoro} />
            <Route path="/university-connect" Component={UniversityConnect} />
            <Route
              path="/university-connect/:university"
              Component={University}
            />
          </Route>
        </Routes>
      </div>

      <footer>
        <h1>Footer</h1>
      </footer>
    </>
  );
}

export default App;
