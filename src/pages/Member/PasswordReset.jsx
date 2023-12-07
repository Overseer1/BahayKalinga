import React from 'react'
import { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordReset = () => 
{

  const [Password, setPassword] = useState("");
  const [ConfPassword, setConfPassword] = useState("");

  const resetPassword = async() =>
  {
   const { data, error } = await supabase.auth.updateUser({
      email: "hanzlizaso@gmail.com",
      password: "new-password",
      })
    if (error) console.log(error);
  }
  
  const [visible, setVisible] = useState(false);
  const isOpen = visible ? "text" : "password";

  const [confVisible, setConfVisible] = useState(false);
  const isOpenConf = confVisible ? "text" : "password";
  return (
    <div>
        <h1>PasswordReset</h1>
        <div className="ml-10 grid grid-flow-col items-center">
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md"
                    type={isOpen}
                    placeholder="Password*"
                    id="confirmPass"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                   <div
                    onClick={() => setVisible(!visible)}
                    className="cursor-pointer mt-[2px] text-[20px] "
                  >
                    {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
                  <input
                    className="h-10 p-3 border border-gray-400 rounded-md -mr-10"
                    type={isOpenConf}
                    placeholder="Confirm password*"
                    value={ConfPassword}
                    id="finalPass"
                    onChange={(e) => setConfPassword(e.target.value)}
                  />
                  <div
                    onClick={() => setConfVisible(!confVisible)}
                    className="cursor-pointer mt-[2px] text-[20px] ml-10"
                  >
                    {confVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
        </div>
          <button onClick={resetPassword}>TestRes</button>
    </div>
  )
}

export default PasswordReset