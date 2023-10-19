import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register/RegisterV2";
import FrontLayout from "./pages/FrontLayout";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminLogin from "./pages/Admin/AdminLogin";
import MemberLayout from "./pages/Member/MemberLayout";
import MemberDashboard from "./pages/Member/MemberDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        {/* Front */}
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="member" element={<MemberLayout />}>
            <Route index element={<MemberDashboard />} />
          </Route>
        </Route>
        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
