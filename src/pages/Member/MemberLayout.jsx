import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MemberLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-5 flex min-h-[calc(100vh-144px)]">
      <div className="p-5 bg-white">
        <div className="text-center">
          <div className="text-lg">Edward Guevarra</div>
          <div className="text-sm">edwardguevarra2003@gmail.com</div>
        </div>
        <div className="bg-gray-300 h-[1px] my-4"></div>
        <div className="flex flex-col gap-3">
          <div onClick={logout} className="font-medium text-lg cursor-pointer">
            Logout
          </div>
        </div>
      </div>
      <div className="grow bg-gray-50 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
