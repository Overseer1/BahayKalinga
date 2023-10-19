import React from "react";
import FirstSection from "../images/FirstSection.png";
import LandingImage from "../images/landing-1.png";

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
            <img src="https://picsum.photos/585/385" alt="" />
            <div className="flex flex-col justify-evenly">
              <div className="text-5xl">A safehaven</div>
              <div className="text-2xl leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation{" "}
              </div>
            </div>
          </div>
          <div className="bg-main p-10 grid grid-cols-2 gap-16 rounded-2xl">
            <div className="flex flex-col justify-evenly">
              <div className="text-5xl">Carefree individuals</div>
              <div className="text-2xl leading-loose">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation{" "}
              </div>
            </div>
            <img src="https://picsum.photos/585/385" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
