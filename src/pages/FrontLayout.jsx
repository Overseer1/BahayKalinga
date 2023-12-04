import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useContext, useState } from "react";
import supabase from "../config/supabaseClient";
import { UserContext } from "../providers/UserProvider";
import Loader from "../components/Loader";

const FrontLayout = () => {
  const { updateUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setUserData = async () => {
      const user = localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token"))
        : "";

      if (user) {
        const response = await supabase
          .from("VisitorAcc")
          .select("*")
          .eq("EmailAddress", user.user.email)
          .single();

        if (response.error) {
          alert(response.error.message);
          return;
        }

        if (response.data) {
          updateUser(response.data);
        }
      }

      setLoading(false);
    };

    setUserData();
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div>
        <header className="sticky top-0">
          <NavBar />
        </header>
        <main className="min-h-[calc(100vh-144px)]">
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default FrontLayout;
