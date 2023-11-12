import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import {} from "bcryptjs-react";

export const authValues = {
  "username": null,
  "password": null
}

export const OnLoginSubmit = async (e) => {
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
