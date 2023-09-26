import React from 'react'
import NavBar from '../components/NavBar'
import HomeView from '../components/HomeView'
import supabase from '../config/supabaseClient'

const Home = () => 
{
  return (
    <div>
      <header className='sticky top-0'>
        <NavBar/>
      </header>
      <main>        
        <HomeView/>
      </main>
    </div>
  )
}

export default Home