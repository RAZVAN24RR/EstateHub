import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import LogoImg from "../assets/Estatehub.webp";
import Nav from "../Components/Nav";
import { useParams } from "react-router-dom";
import axiosInstanceToApi from "../api/networking";
import AddDetailInterface from "../Interfaces/AdDetailInterface";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";

const AddDetail: React.FC<{}> = () => {
  const { id } = useParams();
  const [showAlertError, setShowAlertError] = useState<Boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [adDetail, setAdDetail] = useState<AddDetailInterface>({
    name: "",
    userId: 0,
    m2: 0,
    address: "",
    nameProp: "",
    image: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstanceToApi.get(`/ad/getAdById/${id}`);
        if (response.status) {
          setAdDetail(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);

  const handleAdFavorite = () => {
    setShowAlertSuccess(true);
  };

  const handleViewOwner = () => {
    navigate(`/Account/${adDetail.userId}`);
  };
  const ongoing = () => {
    setShowAlertSuccess(false);
    navigate(`/Account/${localStorage.getItem("jwt")}`);
  };

  return (
    <>
      <Nav
        type={
          localStorage.getItem("jwt") !== null ? "registered" : "unregistered"
        }
        logo={true}
      />
      <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Ad Detail
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Locations appear on our platform every day!
            </p>
          </div>
          {showAlertError && (
            <Alert
              message="Error...Please try again."
              onClose={() => setShowAlertError(false)}
            />
          )}
          {showAlertSuccess && (
            <Alert
              message="Anunt adaugat la favorite."
              onClose={() => ongoing()}
            />
          )}
          <div
            className="container bg-gray-100 mx-auto p-4"
            style={{ marginTop: "5%" }}
          >
            <div className="flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-lg overflow-hidden">
              {/* Colțul Stâng: Imaginea */}
              <div className="md:w-1/2 p-4 flex justify-center items-center">
                <img
                  src={adDetail.image}
                  alt={adDetail.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Colțul Drept: Detalii Anunț */}
              <div
                className="md:w-1/2 p-6"
                style={{ margin: "auto", width: "80%" }}
              >
                <div
                  style={{
                    width: "50px",
                    marginLeft: "auto",
                    marginTop: "-7%",
                  }}
                >
                  <button
                    className="relative px-4 py-2 rounded-md text-pink-600  hover:text-pink-700  group transition duration-1000"
                    onClick={handleAdFavorite}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 h-6 fill-current block group-hover:hidden transition duration-1000"
                    >
                      <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="w-6 h-6 fill-current hidden group-hover:block transition duration-1000 "
                    >
                      <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                    </svg>
                  </button>
                </div>
                <h1 className="text-3xl font-bold mb-4">{adDetail.name}</h1>
                <p className="text-2xl text-blue-600 font-semibold mb-4">
                  {adDetail.price}€
                </p>
                <div className="mb-4">
                  <p className="text-gray-700 mb-2">
                    <strong>Address: </strong>
                    {adDetail.address}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Area: </strong>
                    {adDetail.m2} m²
                  </p>
                  <p className="text-gray-700 mb-2">
                    <strong>Owner: </strong>
                    {adDetail.nameProp}
                  </p>
                  <button
                    className="border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4  rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
                    onClick={handleViewOwner}
                  >
                    View Owner Profile
                  </button>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{adDetail.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AddDetail;
