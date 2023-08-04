import React from 'react'

const Register = () => 
{
  const onmfload = () =>
  {
    alert("under development. see Project for reference.");
  }
  const connect = () =>
  {
    //for database connection
  }
  const read = () =>
  {
    
  }
  const update = () =>
  {
    
  }
  const Delete = () =>
  {
    //
  }
  return (
    <div className='layout bg-slate-600' >
        <h1 className='head1 font-sans'>Register your information and create an account</h1>
        <p className='inst'>Please input the following details required:</p>
        <form className=''>
          <label className=''>
            <input className='mt-5 ml-64' type="text" id="NameOfUser"/> 
            <br/>
            <input className='mt-5 ml-64' type="text" id="AddressOfUser"/>
            <br/>
            <input className='mt-5 ml-64' type="number" id="MobileNumber"/>
            <button className='bg-yellow-900 mt-5 ml-5 p-0' onClick={onmfload}>inamo</button>
            <br/>
            <input className='mt-5 ml-64' type="text" id="OTP"/>
            <br/>
            
          </label>
        </form>
    </div >
  )
}

export default Register