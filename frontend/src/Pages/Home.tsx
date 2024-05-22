import React, { useState, useEffect, FormEvent } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import { useNavigate } from "react-router-dom";
import DataUserInterface from "../Interfaces/DataUserInterface";
import axiosInstanceToApi from "../api/networking";
import Loader from "../Components/Loader";
import AdsInterface from "../Interfaces/AdsInterface";
import { Link } from "react-router-dom";

const Home: React.FC<{}> = () => {
  const [loading, setLoading] = useState<Boolean>(true);
  const [user, setUser] = useState<DataUserInterface>({
    name: "",
    email: "",
    createdAt: "",
    updatedAt: "",
    isAdmin: false,
  });
  const [ads, setAds] = useState<AdsInterface[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<AdsInterface[]>([]);
  const navigate = useNavigate();

  const handleAddAd = () => {
    navigate(`/AddAd/${localStorage.getItem("jwt")}`);
  };

  const handleAddAdmin = () => {
    navigate(`/AddAdmin/${localStorage.getItem("jwt")}`);
  };

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        setLoading(true);
        const response = await axiosInstanceToApi.get(
          `/user/${localStorage.getItem("jwt")}`
        );

        if (response.status === 200) {
          setUser(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData1();
  }, []);

  const fetchData2 = async () => {
    try {
      setLoading(true);
      const response = await axiosInstanceToApi.get(`/ad/ads`);
      if (response.status === 200) {
        setAds(response.data);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData2();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      const response = await axiosInstanceToApi.delete(`/ad/deleteAd/${id}`);
      if (response.status === 200) {
        await fetchData2();
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axiosInstanceToApi.get(
        `/ad/getAdByName/${searchTerm}`,
        {
          params: { name: searchTerm },
        }
      );
      if (response.status === 200) {
        setSearchResults(response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-gray-100">
      <Nav type="registered" logo={true} />
      <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
              Search for new locations
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
              Locations appear on our platform every day!
            </p>
          </div>

          <div>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-12">
              <div className="flex flex-col items-center sm:flex-row sm:justify-center">
                <div className="flex-1 w-full min-w-0 px-4 sm:px-0">
                  <input
                    type="text"
                    name="name"
                    id="nameIc"
                    placeholder="What are you looking for?"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full px-4 py-4 text-base text-black placeholder-gray-500 transition-all duration-200 border-transparent rounded-md caret-indigo-600 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700"
                >
                  Search
                  <svg
                    className="w-5 h-5 ml-3 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
            <div className="max-w-xl mx-auto mt-2">
              {searchResults.length > 0 && (
                <>
                  <h1
                    style={{
                      paddingLeft: "5px",
                      marginBottom: "1%",
                      marginTop: "2%",
                    }}
                  >
                    Results:
                  </h1>
                  {searchResults?.map((item, index) => (
                    <Link
                      to={`/AddDetail/${item.id}/${localStorage.getItem(
                        "jwt"
                      )}`}
                      key={index}
                      className="block p-4 mb-4 transition-all duration-200 border rounded-md shadow-sm hover:bg-gray-200 hover:border-indigo-600"
                    >
                      {item.name} - {item.m2} - {item.address}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center px-8 mt-8 sm:px-0">
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="ml-2 text-sm text-gray-600">
              {" "}
              Your data is completely secured with us. We don’t share with
              anyone.{" "}
            </span>
          </div>
        </div>
      </section>
      <div className="bg-gray-100 sectionMain ">
        {user.isAdmin && (
          <button
            onClick={handleAddAdmin}
            type="submit"
            className="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700"
          >
            <svg
              className="w-5 h-5 mr-3 -ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
            Admin
          </button>
        )}
        <button
          onClick={handleAddAd}
          type="submit"
          className="inline-flex items-center justify-center w-auto px-4 py-4 mt-4 font-semibold text-white transition-all duration-200 bg-indigo-600 border border-transparent rounded-md sm:ml-4 sm:mt-0 sm:w-auto hover:bg-indigo-700 focus:bg-indigo-700"
        >
          Add Ad
          <svg
            className="w-5 h-5 ml-3 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            fill="currentColor"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </button>
      </div>
      <div style={{ paddingTop: "2%" }} className="bg-gray-100"></div>
      <div className="grid grid-cols-1 bg-gray-100 gap-6 mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {ads?.map((item, index) => {
          return (
            <section key={index} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={item.image}
                alt="Ad Image"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                <p className="mt-2 text-gray-600">{item.address}</p>
                <p className="mt-1 text-gray-600">{item.m2} m²</p>
              </div>
              <div className="mt-6 flex justify-between">
                {user?.isAdmin && (
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
                <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                  Details
                </button>
              </div>
            </section>
          );
        })}
      </div>
      <div style={{ paddingBottom: "4%" }} className="bg-gray-100"></div>
      {searchResults.length > 0 && (
        <div className="mt-6 bg-white rounded-lg shadow-md p-6 max-w-xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900">Search Results</h3>
          {searchResults.map((item, index) => (
            <div key={index} className="mt-4">
              <img
                src={item.image}
                alt="Search Result Image"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-2">
                <h4 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h4>
                <p className="mt-1 text-gray-600">{item.address}</p>
                <p className="mt-1 text-gray-600">{item.m2} m²</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
