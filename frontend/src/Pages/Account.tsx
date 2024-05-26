import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import axiosInstanceToApi from "../api/networking";
import DataUserInterface from "../Interfaces/DataUserInterface";
import Loader from "../Components/Loader";
import FavoritDataOut from "../../../backend/src/db/dal/user";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";

const Account: React.FC<{}> = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [showAlertError, setShowAlertError] = useState<Boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState<Boolean>(false);
  const [array, setArray] = useState<number[]>([]);
  const navigate = useNavigate();
  const [user, setUser] = useState<DataUserInterface>({
    name: "",
    email: "",
    createdAt: "",
    image: "",
    updatedAt: "",
    isAdmin: false,
    adsFav: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstanceToApi.get(
          `/user/${localStorage.getItem("jwt")}`
        );
        if (response.status === 200) {
          setUser(response.data);
          response.data.adsFav.forEach((item: any) => {
            setArray((prevArray) => [...prevArray, Number(item.adId)]);
          });
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    setLoading(true);
    const response = await axiosInstanceToApi.delete(`/fav/delete/${id}`);
    if (response.status === 200) {
      setLoading(false);
      setShowAlertSuccess(true);
    } else {
      setLoading(false);
      setShowAlertError(true);
    }
  };

  const ongoing = () => {
    navigate(`/Home/${localStorage.getItem("jwt")}`);
  };

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
      <div className="container  mx-auto p-4" style={{ marginTop: "5%" }}>
        <div className="max-w-lg mx-auto  bg-white rounded-lg shadow-md overflow-hidden ">
          <div className="p-4 py-4 bg-white text-white text-3xl text-center">
            <h2
              className="text-2xl text-gray-600 font-semibold"
              style={{ marginBottom: "20%", fontSize: "30px" }}
            >
              Account Information
            </h2>

            <img
              src={user.image}
              alt="Ad Image"
              className="w-full h-48 object-cover rounded-t-lg mt-5"
            />
          </div>
          {showAlertError && (
            <Alert
              message="Error...Please try again."
              onClose={() => setShowAlertError(false)}
            />
          )}
          {showAlertSuccess && (
            <Alert message="Anunt STERS." onClose={() => ongoing()} />
          )}
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
        </div>
      </div>
      <div style={{ paddingTop: "2%" }} className=""></div>
      <h2
        className="text-2xl text-gray-600 font-semibold"
        style={{ fontSize: "20px", textAlign: "center" }}
      >
        Favorites
      </h2>
      <div className="grid grid-cols-1  gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {user.adsFav.length > 0 &&
          user.adsFav.map((item: FavoritDataOut, index) => {
            return (
              <section
                key={index}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <img
                  src={item.image}
                  alt="Ad Image"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <div className="flex justify-between">
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    onClick={() =>
                      navigate(
                        `/AddDetail/${array[index]}/${localStorage.getItem(
                          "jwt"
                        )}`
                      )
                    }
                    className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-6 h-6 text-pink-600"
                  >
                    <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                  </svg>
                </div>
              </section>
            );
          })}
        {user.adsFav.length === 0 && (
          <h2
            className="text-2xl text-gray-600 font-semibold"
            style={{ fontSize: "15px", textAlign: "center" }}
          >
            Nu aveti anunturi favorite.
          </h2>
        )}
      </div>
      <div style={{ marginTop: "5%" }}></div>
      <Footer />
    </>
  );
};

export default Account;
