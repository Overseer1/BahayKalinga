import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import FirstSection from "../../images/FirstSection.png";
import { useMemo } from "react";
import { useEffect } from "react";

const buttons = [
  {
    name: "Calendar",
    path: "/admin",
  },
  {
    name: "Pending Appointments",
    path: "/admin/pending-appointments",
  },
  {
    name: "Approved Appointments",
    path: "/admin/upcoming-appointments",
  },
  {
    name: "Cancelled Appointments",
    path: "/admin/cancelled-requests",
  },
  {
    name: "List of Previous Visits",
    path: "/admin/list-previous-visits",
  },
  {
    name: "List of Elders",
    path: "/admin/list-elders",
  },
  {
    name: "List of Visitors",
    path: "/admin/list-visitors",
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => 
  {
    localStorage.removeItem("tokenAdmin");
    navigate("/admin/login");
  };

  const currentPageName = useMemo(() => {
    const page = {};
    buttons.forEach((button) => {
      page[button.path] = button.name;
    });
    return page[location.pathname] || "Error";
  }, [location.pathname]);

  useEffect(() => {
    if (!localStorage.getItem("tokenAdmin")) {
      navigate("/admin/login");
    }
  });

  return (
    <div
      className="min-h-screen flex bg-cover"
      style={{ backgroundImage: `url(${FirstSection})` }}
    >
      <div className="shrink-0 w-64 flex flex-col gap-3 p-4 bg-opacity-50 bg-black">
        {buttons.map((button) => (
          <button
            key={button.path}
            onClick={() => navigate(button.path)}
            className={`font-medium rounded-md h-14 hover:bg-green-500 hover:text-white ${
              location.pathname === button.path
                ? "bg-green-500 text-white"
                : "bg-white"
            }`}
          >
            {button.name}
          </button>
        ))}
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
