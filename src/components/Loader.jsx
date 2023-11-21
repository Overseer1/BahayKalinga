import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader fixed top-0 left-0 right-0 bottom-0 z-20 bg-white bg-opacity-50 w-full h-full flex items-center justify-center">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;
