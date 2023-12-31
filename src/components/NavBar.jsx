import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import supabase from "../config/supabaseClient";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../providers/UserProvider";
import { CgProfile } from "react-icons/cg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const NavBar = () => {
  const navigate = useNavigate();

  const { updateUser, user } = useContext(UserContext);
 // resetPass
 const [isResetPressed, setResetPressed] = useState(false);

  // Login
  const [loading, setLoading] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    contactNumber: "",
    email: "",
    password: "",
  });
  const [logInChecker, setChecker] = useState(true);
  const scrollIntoView = (id) => {
    const element = document.getElementById(id);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (element) {
      element.scrollIntoView();
    }
  };
  // const sendForLogIn = () =>
  // {
  //   authValues.email = loginForm.email;
  //   authValues.password = loginForm.password;
  //   onLoginSubmit(authValues.email, authValues.password);
  // }
  const onLoginSubmit = async (e) => {
    setLoading(true);
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginForm.email)) 
    {
      try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: loginForm.email,
            password: loginForm.password,
          });
          if (error) throw error;   
          else if (data) 
          {
            toast.success("Logged in!",{position:"top-center", autoClose:1500});
            const response = await supabase
              .from("VisitorAcc")
              .select("*")
              .eq("EmailAddress", data.user.email)
              .single();
    
            if (response.error) {
              alert(response.error.message);
              return;
            }
    
            if (response.data) {
              updateUser(response.data);
            }
            setOpenLogin(false);
            localStorage.setItem("token", JSON.stringify(data));
            loginForm.email = ""
            loginForm.password = ""
            navigate("/member");
          }
        } catch (error) {
          toast.error("Incorrect username/password", {position:"top-center", autoClose:1500});
        }
    } 
    else
    {
      loginForm.contactNumber = loginForm.email
      onLoginSubmitPhone();
    }
    setLoading(false);
  };
  const onLoginSubmitPhone = async (e) => 
  {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: loginForm.contactNumber,
        password: loginForm.password,
      });
      if (error) throw error;   
      else if (data) 
      {
        toast.success("Logged in!",{position:"top-center", autoClose:1500});
        
        const response = await supabase
          .from("VisitorAcc")
          .select("*")
          .eq("ContactNumber", data.user.phone)
          .single();

        if (response.error) {
          alert(response.error.message);
          return;
        }

        if (response.data) {
          updateUser(response.data);
        }
        setOpenLogin(false);
        localStorage.setItem("token", JSON.stringify(data));
        loginForm.contactNumber = ""
        loginForm.password = ""
        navigate("/member");
      }
    } catch (error) {
      toast.error("Incorrect username/password", {position:"top-center", autoClose:1500});
    }
    setLoading(false);
  };
  
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert(error);
    } else {
      localStorage.removeItem("token");
      updateUser(null);
      navigate("/");
    }
  };

  const forResetPass = async() => {
   console.log(loginForm.email)
   const { data, error } = await supabase.auth.resetPasswordForEmail(loginForm.email, {
    redirectTo: 'https://overseer1.github.io/BahayKalinga/#/resetPass',
  })
   if (data) 
   {
      toast.success("Recovery email has been sent.");
      setResetPressed(false);
   }
   else if (error)
   {
    console.log(error);
   }
  };

  const [visible, setVisible] = useState(false);
  const isOpen = visible ? "text" : "password";
  
  return (
    <>
      <header className="h-20 bg-main">
        <div className="max-w-[1920px] h-full m-auto justify-between flex items-center px-5">
          <div className="w-14 relative">
            <img className="w-full rounded-full" src={logo} alt="AbaKa Logo" />
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
            {!user && (
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
            )}
            <Dialog.Root open={openLogin} onOpenChange={setOpenLogin}>
              <Dialog.Trigger asChild>
                <Link className="text-black text-3xl" hidden={user}>
                  Login
                </Link>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                  <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
                  {isResetPressed ? "Password recovery" : "Log in"}
                  </Dialog.Title>
                  <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                    {isResetPressed ? "Please type your email" : "Input your login credentials here"}
                  </Dialog.Description>
                  <form onSubmit={logInChecker ? onLoginSubmit : onLoginSubmitPhone}>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className="text-violet11 w-[90px] text-right text-[15px]"
                        htmlFor="username"
                      >
                        Email/Phone
                      </label>
                      <input
                        className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                        id="email"
                        value={loginForm.email}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            email: e.target.value,
                          })
                        }
                      />
                    </fieldset>
                    <fieldset className="mb-[15px] flex items-center gap-5">
                      <label
                        className={`text-violet11 w-[90px] text-right text-[15px] ${isResetPressed ? "hidden" : ""}`}
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        className={`text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] ${isResetPressed ? "hidden" : ""}`}
                        id="password"
                        type={isOpen}
                        value={loginForm.password}
                        onChange={(e) =>
                          setLoginForm({
                            ...loginForm,
                            password: e.target.value,
                          })
                        }
                      />
                      <div
                    onClick={() => setVisible(!visible)}
                    className={`float-none cursor-pointer mt-[2px] -ml-[12px] text-[20px] ${isResetPressed ? "hidden" : ""}`}
                  >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                    </fieldset>
                    <div className="mt-[25px] grid grid-cols-2 justify-end gap-56 items-center">
                    <Link
                    className={`text-violet11 w-[100px] text-left text-[15px] ${isResetPressed ? "hidden" : ""}`}
                    onClick={() => {
                      setTimeout(() => {
                        setResetPressed(true)
                      });
                    }}
                    >
                    Forgot password?
                    </Link>
                      <button
                        disabled={loading}
                        className={`bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none ${isResetPressed ? "hidden" : ""}`}
                      >
                        {loading ? "Loading..." : "Log in"}
                      </button>
                    </div>
                  </form>
                  <Dialog.Close asChild>
                  <button
                        onClick={forResetPass}
                        className={`bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none ${isResetPressed ? "" : "hidden"}`}
                      >
                        Send recovery link
                  </button>
                  </Dialog.Close>
                  <Dialog.Close asChild>
                    <button
                      className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                      aria-label="Close"
                      onClick={() => setResetPressed(false)}
                    >
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            {user && (
              <>
                <Link
                  onClick={() => {
                    setTimeout(() => {
                      navigate("/member");
                    });
                  }}
                  className={`text-black text-3xl ${!user ? "hidden" : "none"}`}
                >
                  Appointment
                </Link>
                <div>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                      <div className="outline-none cursor-pointer">
                        <CgProfile className="text-3xl" />
                      </div>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                        sideOffset={5}
                      >
                        <DropdownMenu.Item
                          onClick={logout}
                          className="cursor-pointer group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                        >
                          Logout
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
              </>
            )}
          </div>
        </div>
        <ToastContainer/>
      </header>
    </>
  );
};

export default NavBar;
