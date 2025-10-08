import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import type { JSX } from "react";
import { ContextProvider } from "./context/AppContext";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
};

const RequireRole = ({ role, children }: { role: string; children: JSX.Element }) => {
  const userRole = sessionStorage.getItem("role");
  if (userRole !== role) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <RequireAuth>
                <RequireRole role="Admin">
                  <AdminDashboard />
                </RequireRole>
              </RequireAuth>
            }
          />


          <Route
            path="/employee"
            element={
              <RequireAuth>
                <RequireRole role="Employee">
                  <EmployeeDashboard />
                </RequireRole>
              </RequireAuth>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
