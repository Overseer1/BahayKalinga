import React from 'react'
import NavBar from '../components/NavBar'
import TitleFirstImage from '../components/TitleFirstImage'
import supabase from '../config/supabaseClient'

const Home = () => 
{
  return (
    <div>
      <header className='sticky top-0'>
        <NavBar/>
      </header>
      <main>        
        <TitleFirstImage/>
      </main>
    </div>
  )
}

export default Home