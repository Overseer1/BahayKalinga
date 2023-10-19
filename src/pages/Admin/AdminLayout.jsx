import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="h-screen w-screen gap-2 overflow-hidden">
      <div className="flex h-screen w-screen">
        <div className="bg-slate-400 w-[200px] h-[100%] flex-col items-center pt-[3.5%] p-2">
          {/* //! CLEAR TOKEN FUNCTION HERE */}
          <button
            className="text-sm w-[100%] bg-slate-300 border-none hover:bg-slate-200 rounded-md mb-[10%] duration-300 hover:translate-x-1.5 hover:text-red-500"
            onClick={logout}
          >
            Sign Out
          </button>
          <button className="text-sm w-[100%] bg-slate-300 border-none hover:bg-slate-200 rounded-md mb-[10%] duration-300 hover:translate-x-1.5">
            Pending Request
          </button>
          <button className="text-sm w-[100%] bg-slate-300 border-none hover:bg-slate-200 rounded-md mb-[10%] duration-300 hover:translate-x-1.5">
            List of Elders
          </button>
          <button className="text-sm w-[100%] bg-slate-300 border-none hover:bg-slate-200 rounded-md mb-[10%] duration-300 hover:translate-x-1.5">
            List of Appointments
          </button>
          <button className="text-sm w-[100%] bg-slate-300 border-none hover:bg-slate-200 rounded-md mb-[10%] duration-300 hover:translate-x-1.5">
            Cancelled Request
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
