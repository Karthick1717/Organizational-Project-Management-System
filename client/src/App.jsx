import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Project";
import Tasks from "./pages/Tasks";
import TeamMember from "./pages/TeamMember";
import Analytics from "./pages/Analytics";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/members"
          element={<TeamMember />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />


      <Route
  path="/projects"
  element={<Projects />}
    />

      </Routes>
    </BrowserRouter>
  );
}

export default App;