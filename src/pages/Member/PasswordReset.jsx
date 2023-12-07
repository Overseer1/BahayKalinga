import React from 'react'
import { useState, useEffect } from 'react'
import supabase from '../../config/supabaseClient'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast, ToastContainer } from 'react-toastify';

const PasswordReset = () => 
{
  const [Password, setPassword] = useState("");
  const [ConfPassword, setConfPassword] = useState("");

  const resetPassword = async() =>
  {
    if (Password !== ConfPassword)
    {
      toast.error("Password don't match");
    }
    else
    {
      const { data, error } = await supabase.auth.updateUser({
      password: ConfPassword,
      })
      if (data) toast.success("Password changed");
      else if (error) console.log(error);
    }
   
  }
  
  useEffect(() => {

    supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'PASSWORD_RECOVERY') {
        console.log('PASSWORD_RECOVERY', session + " " + event)
      }
    })
  })
  
  const [visible, setVisible] = useState(false);
  const isOpen = visible ? "text" : "password";

  const [confVisible, setConfVisible] = useState(false);
  const isOpenConf = confVisible ? "text" : "password";
  return (
    <div className='gap-x-45 text-center pt-6 max-w-5xl mx-auto'>
        <h1 className=' text-2xl font-semibold'>Password recovery</h1>
        <div className="text-lg font-light mb-20">
              Please input the following details required:
            </div>
        <div className="ml-10 grid grid-flow-col gap-5 text-center">
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
                    className="cursor-pointer mt-[2px] text-[20px] ml-10 mr-11"
                  >
                    {confVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </div>
        </div>
          <button className="bg-slate-500 text-warmGray-50 py-2 rounded-md px-8 mt-16" onClick={resetPassword}>Change password</button>
          <ToastContainer/>
    </div>
  )
}

export default PasswordReset