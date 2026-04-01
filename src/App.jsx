import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminUploadPage from "./pages/AdminPage/AdminUploadPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProtectedRoute from "./components/protectedRoutes";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Redirect root → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public: Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected: Admin Upload (admin only) */}
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute>
              <AdminUploadPage />
            </ProtectedRoute>
          }
        />

        {/* Catch-all → login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  );
}