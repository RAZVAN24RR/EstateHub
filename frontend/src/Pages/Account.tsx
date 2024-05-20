import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import LogoImg from "../assets/Estatehub.webp";
import Nav from "../Components/Nav";
import axiosInstanceToApi from "../api/networking";
import DataUserInterface from "../Interfaces/DataUserInterface";
import Loader from "../Components/Loader";

const Account: React.FC<{}> = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<DataUserInterface>({
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstanceToApi.get(`/user/2`);
        console.log(response.data);
        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <>
        <Nav type="registered" logo={true} />
        <Loader />
      </>
    );

  return (
    <>
      <Nav type="registered" logo={true} />
      <div className="container mx-auto p-4">
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 py-4 bg-gradient-to-r from-blue-600 to-400 bg-blue-500 text-white text-center">
            <h2 className="text-2xl font-semibold">Account Information</h2>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name:
              </label>
              <p className="bg-gray-100 p-3 rounded-md block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border  rounded-md focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600">
                {user.name}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email:
              </label>
              <p className="bg-gray-100 p-3 rounded-md block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border  rounded-md focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600">
                {user.email}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Date Created:
              </label>
              <p className="bg-gray-100 p-3 rounded-md block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border  rounded-md focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600">
                {user.createdAt}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Last Updated:
              </label>
              <p className="bg-gray-100 p-3 rounded-md block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border  rounded-md focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600">
                {user.updatedAt}
              </p>
            </div>
          </div>
          <div className="p-4 bg-gray-50 text-center">
            <button className="bg-blue-500 text-base font-semibold text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Edit Information
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;
