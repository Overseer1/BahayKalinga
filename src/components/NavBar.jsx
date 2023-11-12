import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { EventBus } from "../eventbus";
import supabase from "../config/supabaseClient";
import { OnLoginSubmit, AuthValues } from "../components/Auth";

const NavBar = () => {
  const navigate = useNavigate();
  // Login
  const [openLogin, setOpenLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const user = loginForm.username;
  const pass = loginForm.password;
  const onLoginSubmit = async (e) => {
    e.preventDefault();
    // TODO: implement login function here
    //! NOTICE: error in logging in
    try 
    {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user,
        password: pass,
      })
      if (error)
      {
        alert("bugok")
      }
      if (data)
      {
        alert("aight");
        console.log(loginForm);
        setOpenLogin(false);
        navigate("/member");
      }
    } 
    catch (error) 
    {
      alert("error in log in " + error);
    }
  };

  const scrollIntoView = (id) => {
    const element = document.getElementById(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (element) {
      element.scrollIntoView();
    }
  };

  const showLogin = () => {
    setOpenLogin(true);
  };

  useEffect(() => {
    EventBus.on("show-login", showLogin);
    return () => {
      EventBus.off("show-login");
    };
  }, []);

  return (
    <>
      <header className="h-20 bg-main">
        <div className="max-w-[1920px] h-full m-auto justify-between flex items-start px-5">
          <div className="mt-5 w-32 relative">
            <img
              className="w-full absolute rounded-full"
              src={logo}
              alt="AbaKa Logo"
            />
          </div>
          <div className="h-full flex item gap-8 items-center">
            <Link
              className="text-black text-3xl"
              onClick={() => {
                setTimeout(() => {
                  navigate("/");
                  setTimeout(() => {
                    scrollIntoView("home");
                  });
                });
              }}
            >
              Home
            </Link>
            <Link
              className="text-black text-3xl"
              onClick={() => {
                setTimeout(() => {
                  navigate("/");
                  setTimeout(() => {
                    scrollIntoView("about");
                  });
                });
              }}
            >
              About Us
            </Link>
            <Link
              onClick={() => {
                setTimeout(() => {
                  navigate("/register");
                });
              }}
              className="text-black text-3xl"
            >
              Register
            </Link>
            <Dialog.Root open={openLogin} onOpenChange={setOpenLogin}>
              <Dialog.Trigger asChild>
                <Link className="text-black text-3xl">Login</Link>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                    Login
                  </Dialog.Title>
                  <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                    Input your login credentials here.
                  </Dialog.Description>
                  <form
                    onSubmit={() => {OnLoginSubmit()}}
                  >
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className="text-violet11 w-[90px] text-right text-[15px]"
                        htmlFor="username"
                      >
                        Username
                      </label>
                      <input
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="username"
                        value={loginForm.username}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            username: e.target.value,
                          })
                        }
                      />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className="text-violet11 w-[90px] text-right text-[15px]"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                      />
                    </fieldset>
                    <div className="mt-[25px] flex justify-end">
                      <button
                        type="submit"
                        className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                  <Dialog.Close asChild>
                    <button
                      className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                      aria-label="Close"
                    >
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </header>
    </>
  );
};

export default NavBar;
