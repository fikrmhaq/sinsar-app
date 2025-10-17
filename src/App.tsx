import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Data from "./pages/Admin/Data";
import ProtectedRoute from "./components/ProtectedRoute";
import Peminjaman from "./pages/Mahasiswa/Peminjaman";
import Permohonan from "./pages/Admin/Permohonan";
import RoleBasedRoute from "./components/RoleBasedRoute";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />
              <Route element={<RoleBasedRoute allowedRoles={[1]} />}>
                <Route path="/barang" element={<Data />} />
                <Route path="/permohonan" element={<Permohonan />} />
              </Route>



            </Route>
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
