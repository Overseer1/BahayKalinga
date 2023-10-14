import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";

const NavBar = () => {
  const [openLogin, setOpenLogin] = useState(true);
  const navigate = useNavigate();

  const LogIn = () => {
    setOpenLogin(false);
  };

  const toAdmin = () => {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "root" && pass === "admin") {
      navigate("/Admin");
    }
  };

  const scrollIntoView = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView();
    }
  };

  return (
    <>
      <header className="h-20 bg-main">
        <div className="max-w-[1920px] h-full m-auto justify-between flex items-start px-5">
          <div className="mt-5 w-32 relative">
            <img className="w-full absolute" src={logo} alt="AbaKa Logo" />
          </div>
          <div className="h-full flex item gap-8 items-center">
            <Link
              className="text-black text-3xl"
              onClick={() => scrollIntoView("home")}
            >
              Home
            </Link>
            <Link
              className="text-black text-3xl"
              onClick={() => scrollIntoView("about")}
            >
              About Us
            </Link>
            <Link className="text-black text-3xl">Register</Link>
            <Link className="text-black text-3xl" onClick={LogIn}>
              Login
            </Link>
            {/* <Link
              className="text-black text-lg"
              onClick={() => scrollIntoView("dono")}
            >
              Donate
            </Link>
            <Link className="text-black text-lg" to="/register">
              Sign-up
            </Link> */}
          </div>
        </div>
      </header>
      <div className={`login-modal ${openLogin ? "hidden" : "visible"}`}>
        <div className="login-modal-overlay">
          <div className="login-modal-content">
            <div className="login-modal-header">LOGIN</div>
            <form className="grid p-2 gap-y-1">
              <div className="font-semibold text-[18px]">Username</div>
              <input
                type="text"
                className="login-input"
                placeholder="Enter Username"
                id="user"
              />
              <div className="font-semibold text-[18px]">Password</div>
              <input
                type="password"
                className="login-input"
                placeholder="Enter Password"
                id="pass"
              />
              <a className="login-button login-button-login" onClick={toAdmin}>
                LOGIN
              </a>
              <a
                onClick={() => setOpenLogin(!openLogin)}
                className="login-button login-button-cancel"
              >
                CANCEL
              </a>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
