import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FirstSection from "../../images/FirstSection.png";
import { useMemo } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const currentPageName = useMemo(() => {
    const page = {
      "/admin": "Calendar",
    };
    return page[location.pathname] || "Error";
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex bg-cover"
      style={{ backgroundImage: `url(${FirstSection})` }}
    >
      <div className="shrink-0 w-64 flex flex-col gap-3 p-4 bg-opacity-50 bg-black">
        <button
          className={`font-medium rounded-md h-14 hover:bg-slate-500 hover:text-white ${
            location.pathname === "/admin"
              ? "bg-slate-500 text-white"
              : "bg-white"
          }`}
        >
          Calendar
        </button>
        <button className="font-medium bg-white rounded-md h-14 hover:bg-slate-500 hover:text-white">
          Pending Appointments
        </button>
        <button className="font-medium bg-white rounded-md h-14 hover:bg-slate-500 hover:text-white">
          Upcoming Visitors
        </button>
        <button className="font-medium bg-white rounded-md h-14 hover:bg-slate-500 hover:text-white">
          Cancelled Requests
        </button>
        <button className="font-medium bg-white rounded-md h-14 hover:bg-slate-500 hover:text-white">
          List of Previous Visits
        </button>
        <button className="font-medium bg-white rounded-md h-14 hover:bg-slate-500 hover:text-white">
          List of Elders
        </button>
        <button className="font-medium bg-white rounded-md h-14 hover:bg-slate-500 hover:text-white">
          List of Visitors
        </button>
      </div>
      <div className="grow">
        <div className="text-center text-lg font-medium bg-gray-200 py-2">
          Admin Dashboard
        </div>
        <div className="text-center flex justify-between p-4 items-center">
          <div className="flex items-center">
            <button className="font-medium text-xl bg-white rounded-md h-10 cursor-default px-4">
              {currentPageName}
            </button>
          </div>
          <div className="flex gap-3">
            <button className="font-medium bg-white rounded-md h-10 hover:bg-slate-500 hover:text-white px-4">
              Notifications
            </button>
            <button
              onClick={logout}
              className="font-medium bg-white rounded-md h-10 hover:bg-slate-500 hover:text-white px-4"
            >
              Sign Out
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
