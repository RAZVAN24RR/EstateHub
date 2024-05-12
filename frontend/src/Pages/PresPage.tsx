import React from "react";
import Logo from "../assets/Estatehub.webp";
import Footer from "../Components/Footer";
import Back from "../assets/back.png";

const PresPage: React.FC<{}> = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-[#101212] relative to-[#111827]">
        <header className="absolute inset-x-0 top-0 z-10 w-full">
          <div className="px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              <div className="flex-shrink-0">
                <a href="#" title="" className="flex">
                  <img className="w-auto h-8" src={Logo} alt="" />
                </a>
              </div>

              <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                <h2 className="text-base text-white transition-all duration-200 hover:text-opacity-80 ml-3">
                  {"   "}
                  EstateHub{" "}
                </h2>
              </div>

              <div className="lg:flex lg:items-center lg:justify-end lg:space-x-6 sm:ml-auto">
                <a
                  href="/Login"
                  title=""
                  className="hidden text-base text-white transition-all duration-200 lg:inline-flex hover:text-opacity-80"
                >
                  {" "}
                  Log in{" "}
                </a>

                <a
                  href="/Register"
                  title=""
                  className="inline-flex items-center justify-center px-3 sm:px-5 py-2.5 text-sm sm:text-base font-semibold transition-all duration-200 text-white bg-white/20 hover:bg-white/40 focus:bg-white/40 rounded-lg"
                  role="button"
                >
                  {" "}
                  Register for free{" "}
                </a>
              </div>

              <button
                type="button"
                className="inline-flex p-2 ml-1 text-white transition-all duration-200 rounded-md sm:ml-4 lg:hidden focus:bg-gray-800 hover:bg-gray-800"
              >
                <svg
                  className="block w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>

                <svg
                  className="hidden w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </header>

        <section className="relative lg:min-h-[1000px] pt-24 pb-10 sm:pt-32 sm:pb-16 lg:pb-24">
          <div className="absolute inset-x-0 bottom-0 z-10 hidden lg:flex">
            <img className="hidden w-full lg:block" src={Back} alt="" />
            <img className="block w-full lg:hidden" src={Back} alt="" />
          </div>

          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 relative z-20">
            <div className="max-w-xl mx-auto text-center">
              <h1 className="text-4xl font-bold sm:text-6xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">
                  {" "}
                  Streamlined Apartment Hunting
                </span>
              </h1>
              <p className="mt-5 text-base text-white sm:text-xl">
                Your Trusted Real Estate App! Discover the easiest way to find
                student-friendly apartments with our real estate app.
              </p>

              <a
                href="/Register"
                title=""
                className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-white transition-all duration-200 bg-blue-600 rounded-lg sm:mt-16 hover:bg-blue-700 focus:bg-blue-700"
                role="button"
              >
                Register for free
                <svg
                  className="w-6 h-6 ml-8 -mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default PresPage;
