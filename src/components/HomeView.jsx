import React from 'react'
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import MainPic from '../images/MainPic.jpg';
import Chapel from '../images/Chapel.jpg';
import Main from '../images/Main.jpg';
import Facility1 from '../images/Facility1.jpg';
import Footer from './Footer';

const TitleFirstImage = () => {
  return (
    <div className='bg-[#EFF1DB]  place-content-center text-black '>
      <div id='#Home'  className='pt-5'/>
      <div className='' >
        {/* first */}
        <header className='font-semibold font-sans pt-[3%] text-center text-[50px]'>Bahay Kalinga San Jose Patag</header>
        <h1 className='text-center text-[30px] font-sans font-semibold'>A shelter for the elderly women</h1>

        <div className='grid place-content-center'>
          <div className='snap-center'>
            <img src={Main} className='ml-[5%] h-[80%] w-[90%] rounded-lg mt-[5%] snap-center'></img>
          </div>
          {/* second */}
          <div id='#AboutUs'  className=''/>
          <div href=""
            className='bg-black bg-opacity-[4%] h-[70%] m-[5%] rounded-[2%]'>

            <div className='grid grid-cols-2 space-y-[10%] space-x-[4%]  m-[1%]'>
              <div >
                {/* can change pic */}
                <img src={Chapel} className='h-[90%] rounded-md mt-[2%] ml-[2%]'></img></div>
              <div>
                <h1 className='font-bold  text-md'>About Us</h1>
                <p className='text-justify pr-[2%]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae qui ut delectus aut exercitationem. Temporibus quisquam vero ipsam fuga quo, impedit obcaecati, nisi illum facilis, facere praesentium libero corporis culpa reiciendis molestias sit iste. Enim quidem fuga id repudiandae, praesentium consequuntur earum reprehenderit doloribus unde ratione odit aspernatur porro blanditiis magni error iusto exercitationem, eaque maiores pariatur dolore facilis quod officia non quasi. Fugit inventore porro totam ut fuga placeat rerum saepe nulla odit dolorum molestias veritatis suscipit modi sit, voluptatem quisquam eveniet illum accusantium necessitatibus. Neque, repellendus quis. Quos veritatis quod nostrum officia inventore, nihil corporis fugit nulla! Consequuntur!</p>
              </div>
            </div>
          </div>
          {/* third */}
          <div id="#AboutUs"
            className='bg-black bg-opacity-[4%] h-[74.5%] m-[5%] rounded-[2%]'>
            <div className='grid grid-cols-2  space-x-[4%] mt-[2%] m-[1%]'>
              <div className='ml-[2%] mr-[3%] mt-[7%]'>
                <p className='font-bold  text-md'>About Us</p>
                <p className='text-justify '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae qui ut delectus aut exercitationem. Temporibus quisquam vero ipsam fuga quo, impedit obcaecati, nisi illum facilis, facere praesentium libero corporis culpa reiciendis molestias sit iste. Enim quidem fuga id repudiandae, praesentium consequuntur earum reprehenderit doloribus unde ratione odit aspernatur porro blanditiis magni error iusto exercitationem, eaque maiores pariatur dolore facilis quod officia non quasi. Fugit inventore porro totam ut fuga placeat rerum saepe nulla odit dolorum molestias veritatis suscipit modi sit, voluptatem quisquam eveniet illum accusantium necessitatibus. Neque, repellendus quis. Quos veritatis quod nostrum officia inventore, nihil corporis fugit nulla! Consequuntur!</p>
              </div>
              <div >
                {/* can change pic */}
                <img src={Facility1} className='h-[95%]  rounded-md mt-[1%] ml-[1%]'></img>
              </div>
            </div>
          </div>
          {/* furt */}
          <div
            id="#dono"
            className=' bg-black bg-opacity-[4%] h-[70%] m-[5%] rounded-md  mb-[10%]'>
            <div className='grid grid-cols-2 m-[2%] gap-4'>
              <div className="">
                <p className='border-2 border-blue-700  text-center bg-blue-200 w-[100%] rounded-md font-bold text-[150%] text-blue-500'>GCASH</p>
              </div>
              <div>
                <p className='border-2 border-green-700 text-center bg-green-200 w-[100%] rounded-md font-bold text-[150%] text-green-500'>PAYMAYA</p>
              </div>
            </div>
            <div className="grid grid-cols-2 -mt-[2%] gap-4  place-items-center">
            <img className="h-[80%] w-[30%]" src="https://th.bing.com/th/id/OIP.v13LZtvg6zloWw39JAEnVwHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7" />
            <img className="h-[80%] w-[30%]" src="https://th.bing.com/th/id/OIP.v13LZtvg6zloWw39JAEnVwHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7" />
            </div>
            <div className="mt-[2%] text-center">
              <p>To any material donations, kindly send it directly on Bahay Kalinga San Jose Patag </p>
              <p>Address: Gulod | San Jose Patag, Santa Maria, Bulacan </p>
            </div>
          </div>


        </div> <Footer />
      </div>



    </div>
  )
}

export default TitleFirstImage