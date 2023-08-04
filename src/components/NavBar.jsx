import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => 
{ 
  const LogIn = () => 
  {
    //to new HTML page
    //add supabase API for GET
  }
  const Register = (event) => 
  {
    //to new HTML page
    //add supabase API for POST
  }
  const About = () => 
  {
    document.getElementById('#AboutUs').scrollIntoView();
  }
  const Dono = () => 
  {
    document.getElementById('#dono').scrollIntoView();
  }
  const Home = () => 
  {
    document.getElementById('#Home').scrollIntoView();
  }
  return (
    <header className='bg-[#D0B49F] sticky top-0'>
      <nav>
        <div className='flex items-center place-content-center gap-[0.5%]  p-[0.6%]'>
          <Link className='border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-3 rounded-md'>Bahay Kalinga</Link>
          <Link className='border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-3 rounded-md' onClick={Home}>Home</Link>
          <Link className='border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-3 rounded-md' onClick={About}>About</Link>
          <Link className='border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-3 rounded-md' nponClick={Dono}>Donate</Link>
          <Link className='border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-3 rounded-md' onClick={LogIn}>Login</Link>
          <Link className='border-0 text-black bg-[#D0B49F] hover:bg-[#EFF1DB] font-medium hover:font-semibold hover:translate-x-3 rounded-md' to='/register' onClick={Register}>Sign-up</Link>
        </div>
      </nav>
    </header>
  )
}
export default NavBar