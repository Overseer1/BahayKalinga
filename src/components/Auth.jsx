import { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import {} from "bcryptjs-react";

export const authValues = {
  "username": null,
  "password": null
}

export const OnLoginSubmit = (event) => {
  const [openLogin, setOpenLogin, loginForm, setLoginForm] = AuthValues();

  //! NOTICE: add login bullshit fuck shit here.
  //event.preventDefault();
  // TODO: implement login function here

  //console.log(loginForm);
  //setOpenLogin(false);
	console.log('login!')
};
