import React from "react";
import FirstSection from "../images/FirstSection.png";
import LandingImage from "../images/landing-1.png";
import image from "../images/image1.png"
import image2 from "../images/image2.png"
import image3 from "../images/image3.png"
const Home = () => {
  return (
    <div
      className="bg-cover"
      style={{ backgroundImage: `url(${FirstSection})` }}
    >
      <div className="max-w-[1920px] m-auto px-5">
        <div id="home" className="py-10 max-w-7xl mx-auto">
          <div className="bg-main min-h-[250px] text-center flex justify-center items-center flex-col gap-6">
            <div className="font-['Oooh_Baby'] text-7xl">
              Welcome to Bahay Kalinga
            </div>
            <div className="text-4xl">A shelter for elderly women</div>
          </div>
          <img
            className="w-full mt-10"
            src={LandingImage}
            alt="landing_image"
          />
        </div>
        <div
          id="about"
          className="py-10 max-w-7xl mx-auto flex flex-col gap-24"
        >
          <div className="bg-main p-10 grid grid-cols-2 gap-16 rounded-2xl">
            <img src={image3} alt="" />
            <div className="flex flex-col justify-evenly">
              <div className="text-5xl">About us</div>
              <div className="text-2xl leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation{" "}
              </div>
            </div>
          </div>
          <div className="bg-main p-10 grid grid-cols-2 gap-16 rounded-2xl">
            <div className="flex flex-col justify-evenly">
              <div className="text-5xl">Mission</div>
              <div className="text-2xl leading-loose">
              To give its utmost effort in creating a loving, caring and nourishing home environment for elderly, sick, poor, and abandoned women who need food, shelter, medicines, emotional and spiritual guidance
{" "}
              </div>
            </div>
            <img src={image2} alt="" />
          </div>
          <div className="bg-main p-10 grid grid-cols-2 gap-16 rounded-2xl">
            <img src={image} alt="" />
            <div className="flex flex-col justify-evenly">
              <div className="text-5xl">Vision</div>
              <div className="text-2xl leading-loose">
              To be a home of loving people, United and Christ centered.{" "}
              </div>
            </div>
          </div>
          <div className="bg-main p-10 grid grid-cols-2 gap-16 rounded-2xl">
            <div className="flex flex-col justify-evenly">
              <div className="text-5xl">You can find us here</div>
              <div className="text-2xl leading-loose">
                Gulod 1, San Jose Patag, Santa Maria, Bulacan
                
              </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4079.541972251424!2d120.9825204733127!3d14.82358357458892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397baa91aa243ff%3A0xe2163772668b32a9!2sBahay%20Kalinga%20of%20Sta.%20Maria!5e1!3m2!1sen!2sph!4v1701955358168!5m2!1sen!2sph" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
