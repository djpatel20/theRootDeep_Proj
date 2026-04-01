import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminUploadPage from "./pages/AdminPage/AdminUploadPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import LearningPage from "./pages/LearningPage/LearningPage";
import ProtectedRoute from "./components/protectedRoutes";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="learning" element={<LearningPage />} />
          <Route path="login" element={<LoginPage />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="upload" element={<AdminUploadPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}
