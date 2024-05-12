import React from "react";
import Footer from "../Components/Footer";
import LogoImg from "../assets/Estatehub.webp";

const Logo: React.FC<{}> = () => {
  return (
    <>
      <div className="flex-shrink-0">
        <a href="#" title="" className="flex">
          <img className="w-auto h-8" src={LogoImg} alt="" />
        </a>
      </div>

      <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
        <h2 className="text-base text-white transition-all duration-200 hover:text-opacity-80 ml-3">
          {"   "}
          EstateHub{" "}
        </h2>
      </div>
    </>
  );
};

export default Logo;
