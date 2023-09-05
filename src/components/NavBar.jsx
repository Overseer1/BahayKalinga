import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsHouseFill } from "react-icons/bs";

const NavBar = () => {
  const [openLogin, setOpenLogin] = useState(true);

  const LogIn = () => {
    setOpenLogin(false);
    //to new HTML page
    //add supabase API for GET
  };
  const Register = (event) => {
    //to new HTML page
    //add supabase API for POST
  };
  const About = () => {
    document.getElementById("#AboutUs").scrollIntoView();
  };
  const Dono = () => {
    document.getElementById("#dono").scrollIntoView();
  };
  const Home = () => {
    document.getElementById("#Home").scrollIntoView();
  };
  return (
    <header className="bg-[#D0B49F] sticky top-0">
      <nav className="">
        <p className="absolute mt-[1.5%] ml-[2%] text-[20px] font-bold flex">
          <BsHouseFill className="text-[25px]" />
          BAHAY KALINGA{" "}
        </p>
        <div className="flex items-center place-content-center gap-[0.5%]  p-[0.6%]">
          <Link
            className="border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-2 hover:mr-3 rounded-md"
            onClick={Home}
          >
            Home
          </Link>
          <Link
            className="border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-2 hover:mr-3 rounded-md"
            onClick={About}
          >
            About
          </Link>
          <Link
            className="border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-2 hover:mr-3 rounded-md"
            onClick={Dono}
          >
            Donate
          </Link>
          <Link
            className="border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-2 hover:mr-3 rounded-md"
            onClick={LogIn}
          >
            Login
          </Link>
          <Link
            className="border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-2 hover:mr-3 rounded-md"
            to="/register"
            onClick={Register}
          >
            Sign-up
          </Link>
        </div>
      </nav>

      <div
        className={`${
          openLogin ? "hidden" : "visible w-screen justify-center flex"
        }  `}
      >
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex  items-center  place-content-center ">
          <div className="bg-slate-300 md:h-[40%] h-[30%] md:w-[25%] w-[65%] rounded-md">
            <div className="justify-center flex font-semibold text-[20px] bg-slate-200 rounded-t-md p-1">
              LOGIN
            </div>
            <form className="grid p-2 gap-y-1 ">
              <div className="font-semibold text-[18px]">Username</div>
              <input
                type="text"
                className="w-[100%] rounded-md p-1 bg-slate-100"
                placeholder="Enter Username"
              />
              <div className="font-semibold text-[18px]">Password</div>
              <input
                type="password"
                className="w-[100%] rounded-md p-1 bg-slate-100"
                placeholder="Enter Password"
              />
              <a className="p-1 rounded-md mt-2 bg-slate-100 hover:bg-blue-400 cursor-pointer text-center">
                LOGIN
              </a>
              <a
                onClick={() => setOpenLogin(!openLogin)}
                className="p-1 rounded-md mt-2 bg-slate-100 hover:bg-red-300 cursor-pointer text-center"
              >
                CANCEL
              </a>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};
export default NavBar;
