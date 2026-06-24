import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Project";
import Tasks from "./pages/Tasks";
import TeamMembers from "./pages/TeamMember";
import Analytics from "./pages/Analytics";

import ProtectedRoute from "./pages/ProtectedRoute";
import RoleProtectedRoute from "./pages/RoleProtected";
import NavBar from "./pages/NavBar"

function App() {
  return (
    <BrowserRouter>
     {localStorage.getItem("token")&&<NavBar/>}
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "Admin",
                "Manager",
              ]}
            >
              <Projects />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <Tasks />
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "Admin",
              ]}
            >
              <TeamMembers />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <RoleProtectedRoute
              allowedRoles={[
                "Admin",
              ]}
            >
              <Analytics />
            </RoleProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;