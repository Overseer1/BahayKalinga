import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import {} from "bcryptjs-react";

//! for registration, login, and admin login

//! universal variables
export const authValues = {
  username: null,
  password: null,
  firstname: null,
  middlename: null,
  lastname: null,
  address: null,
  email: null,
  password: null,
  confpassword: null,
  verificationCode: null,
  image: null,
};

export const OnLoginSubmit = async (e) => {
  const navigate = useNavigate();
  e.preventDefault();
  // TODO: implement login function here
  //! NOTICE: error in logging in
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: authValues.email,
      password: authValues.password,
    });
    if (error) {
      alert("bugok");
    }
    if (data) {
      alert("aight");
      console.log("call: LOGIN FORM");
      //setOpenLogin(false);
      navigate("/member");
    }
  } catch (error) {
    alert("error in log in " + error);
  }
};

const addUser = async (e) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: authValues.email,
      password: authValues.password,
    });
    if (data) {
      console.log("goodshit" + data);
      const { data: logs, error: logsError } = await supabase.auth.api.getLogs({
        limit: 1,
        type: "signup",
      });

      if (logsError) {
        console.error(logsError);
      } else {
        console.log(logs);
      }
    }
    if (error) {
      console.log("u fucked");
      alert("u fucked");
    }
  } catch (err) {
    //no function
  }
};
