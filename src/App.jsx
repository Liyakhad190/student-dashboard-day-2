import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./pages/auth/Login";
import AdminPortal from "./pages/admin/AdminPortal";
import FacultyPortal from "./pages/faculty/FacultyPortal";
import StudentPortal from "./pages/student/StudentPortal";
import StudentVerification from "./pages/StudentVerification";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/verify/:studentId" element={<StudentVerification />} />

          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminPortal />} />
          </Route>

          <Route element={<ProtectedRoute roles={["faculty"]} />}>
            <Route path="/faculty/*" element={<FacultyPortal />} />
          </Route>

          <Route element={<ProtectedRoute roles={["student"]} />}>
            <Route path="/student/*" element={<StudentPortal />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
