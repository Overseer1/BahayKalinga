import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../../providers/UserProvider";
import supabase from "../../config/supabaseClient";

const MemberLayout = () => {
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-5 flex min-h-[calc(100vh-144px)]">
      <div className="p-5 bg-white">
        {user && (
          <>
            <div className="text-center">
              <div className="text-lg">
                {user?.FirstName} {user?.MiddleName} {user?.LastName}
              </div>
              <div className="text-sm">{user?.EmailAddress}</div>
            </div>
            <div className="bg-gray-300 h-[1px] my-4"></div>
            <div className="flex flex-col gap-3">
              <div
                onClick={logout}
                className="font-medium text-lg cursor-pointer"
              >
                Logout
              </div>
            </div>
          </>
        )}
      </div>
      <div className="grow bg-gray-50 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default MemberLayout;
