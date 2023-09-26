import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/supabaseClient";
const AdminDashboard = () => {
  //for read data
  const [VisitorAcc, setVisitorAcc] = useState("");
  const [readError, setReadError] = useState("");
  const Read = () => {
    useEffect(() => {
      const fetchVisitorAcc = async () => {
        const { data, error } = await supabase.from("VisitorAcc").select();
        if (error) {
          setReadError("Fetch data err");
          setVisitorAcc(null);
          console.log(error);
        }
        if (data) {
          //! this is currently not finished
          setVisitorAcc(data);
          setReadError(null);
        }
      };
      fetchVisitorAcc();
    }, []);
  };
  //for update only
  const id = 10;
  const update = async (e) => {
    e.preventDefault();
    if (true) {
      //setFormError("error");
      return;
    }
    const { data: test, error } = await supabase
      .from("VisitorAcc")
      .update()
      .eq("id", id)
      .single();
    // if (error) {
    //   console.log(error);
    // }
    // if (test) {
    //   console.log(test);
    //   setFormError(null);
    //   navigate("/");
    // }
  };
  const Delete = () => {};

  const navigate = useNavigate();
  {/* //! CLEAR TOKEN FUNCTION HERE */}
  const SignOff = () => {
    navigate("/")
  };
  return (
    <div className="h-screen w-screen gap-2 overflow-hidden">
      <div className="flex h-screen w-screen">
        <div className="bg-slate-400 w-[200px] h-[100%] flex-col items-center pt-[3.5%] p-2">
          {/* //! CLEAR TOKEN FUNCTION HERE */}
          <button className="text-sm w-[100%] bg-slate-300 border-none hover:bg-slate-200 rounded-md mb-[10%] duration-300 hover:translate-x-1.5 hover:text-red-500" onClick={SignOff}>Sign Out</button>
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
        <div className="flex-col h-[50%] w-[100%]">
          <div className="bg-slate-400 h-[50px] w-[100%] flex justify-center items-center font-bold">
            ADMIN DASHBOARD
          </div>
          <main className="h-[100%] w-[100%] p-2 text-black">
            <div className="h-[70%] w-[100%] flex gap-x-2">
              <div className="bg-blue-300  h-[80%] w-[100%]  rounded-md text-center font-semibold p-1">
                <p className="mb-2">Upcoming Visitor</p> {/* Card Name */}
                <div className="bg-slate-200 p-2 rounded-md mb-2 cursor-pointer">
                  <div className="flex justify-between">
                    <p>Hanz Lizaso</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Rowena Lizaso</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
                <div className="bg-slate-200 p-2 rounded-md cursor-pointer">
                  <div className="flex justify-between">
                    <p>Marc Lebadia</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Belinda Lebadia</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-300  h-[80%] w-[100%]  rounded-md text-center font-semibold p-1">
                <p className="mb-2">Newly Signed Visitors</p> {/* Card Name */}
                <div className="bg-slate-200 p-2 rounded-md mb-2 cursor-pointer">
                  <div className="flex justify-between">
                    <p>Hanz Lizaso</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Rowena Lizaso</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
                <div className="bg-slate-200 p-2 rounded-md cursor-pointer">
                  <div className="flex justify-between">
                    <p>Marc Lebadia</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Belinda Lebadia</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[70%] w-[100%] flex gap-x-2">
              <div className="bg-red-300  h-[80%] w-[100%]  rounded-md text-center font-semibold p-1">
                <p className="mb-2">Canceled Request</p> {/* Card Name */}
                <div className="bg-slate-200 p-2 rounded-md mb-2 cursor-pointer">
                  <div className="flex justify-between">
                    <p>Hanz Lizaso</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Rowena Lizaso</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
                <div className="bg-slate-200 p-2 rounded-md cursor-pointer">
                  <div className="flex justify-between">
                    <p>Marc Lebadia</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Belinda Lebadia</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-200  h-[80%] w-[100%]  rounded-md text-center font-semibold p-1">
                <p className="mb-2">New Request</p> {/* Card Name */}
                <div className="bg-slate-200 p-2 rounded-md mb-2">
                  <div className="flex justify-between">
                    <p>Hanz Lizaso</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Rowena Lizaso</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
                <div className="bg-slate-200 p-2 rounded-md">
                  <div className="flex justify-between">
                    <p>Marc Lebadia</p>
                    <p>1:00 - 3:00</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Belinda Lebadia</p>
                    <p>September 28 - Thursday</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[46%] w-[100%] bg-slate-400 rounded-md flex items-center justify-center ">
              {" "}
              CALENDAR{" "}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
