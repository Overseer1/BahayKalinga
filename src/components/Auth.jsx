import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import {} from "bcryptjs-react";
import { toast } from "react-toastify";


//! for registration, and admin login

//! universal variables
export const authValues = {
  username: null,
  password: null,
  firstname: null,
  middlename: null,
  lastname: null,
  address: null,
  email: null,
  contactNumber: null,
  password: null,
  confpassword: null,
  verificationCode: null,
  image: null,
};
export const onLoginAdminSubmit = async (Email, Password) => {
  //e.preventDefault();
  //const navigate = useNavigate();
  //! NOTICE: NOT IN USE.
  try {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)
    })
    console.log(Email, Password);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: Email,
      password: Password,
    });
    if (error) throw error;
    else if (data) 
    {
      
      //localStorage.setItem("token", JSON.stringify(data));
      // const { data, error } = await supabase.auth.getSession();
      // if (error) 
      // {
      //   console.log(error);
      // } 
      // else if (data) 
      // {
      //   console.log(data);
      // }
      //setOpenLogin(false);
      //navigate("/member");
    }
  } 
  catch (error) 
  {
    toast.error(error);
    console.log(error);
  }
};

export const addUser = async (userEmailR, userPassword) => {
  const { data, error } = await supabase.auth.signUp({
    email: userEmailR,
    password: userPassword,
  });
  if (error) {
    console.log(error);
  }
  else if (data) {
    console.log(data);
    const { error } = await supabase.auth.signOut();
    if (error)
    {
      console.log(error)
    }
  }
};

export const addUserWithConNum = async (userPhone, userPassword) => {
  const { data, error } = await supabase.auth.signUp({
    phone: userPhone,
    password: userPassword,
  });
  if (error) {
    console.log(error);
  }
  else if (data) {
    console.log(data);
    const { error } = await supabase.auth.signOut();
    if (error)
    {
      console.log(error)
    }
  }
};