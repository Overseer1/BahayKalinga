import React from "react";
import Home from "./pages/Home";
import Register from "./pages/Register/RegisterV2";
import FrontLayout from "./pages/FrontLayout";
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminLogin from "./pages/Admin/AdminLogin";
import MemberLayout from "./pages/Member/MemberLayout";
import MemberDashboard from "./pages/Member/MemberDashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminPendingAppointments from "./pages/Admin/AdminPendingAppointments";
import AdminUpcomingAppointments from "./pages/Admin/AdminUpcomingAppointments";
import AdminCancelledRequests from "./pages/Admin/AdminCancelledRequests";
import AdminListPreviousVisits from "./pages/Admin/AdminListPreviousVisits";
import AdminListElders from "./pages/Admin/AdminListElders";
import AdminListVisitors from "./pages/Admin/AdminListVisitors";
import PasswordReset from "./pages/Member/PasswordReset";
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./providers/UserProvider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <div>
        <Routes>
        <Route path="resetPass" element={<PasswordReset />} />
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
            <Route
              path="pending-appointments"
              element={<AdminPendingAppointments />}
            />
            <Route
              path="upcoming-appointments"
              element={<AdminUpcomingAppointments />}
            />
            <Route
              path="cancelled-requests"
              element={<AdminCancelledRequests />}
            />
            <Route
              path="list-previous-visits"
              element={<AdminListPreviousVisits />}
            />
            <Route path="list-elders" element={<AdminListElders />} />
            <Route path="list-visitors" element={<AdminListVisitors />} />
          </Route>
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
