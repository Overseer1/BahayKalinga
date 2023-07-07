import React from 'react'
import NavBar from '../components/NavBar'
import TitleFirstImage from '../components/TitleFirstImage'

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