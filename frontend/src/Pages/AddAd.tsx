import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Footer from "../Components/Footer";
import Nav from "../Components/Nav";
import AddFormData from "../Interfaces/AddFormData";
import axiosInstanceToApi from "../api/networking";
import Loader from "../Components/Loader";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";

const AddAd: React.FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showAlertError, setShowAlertError] = useState<Boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState<Boolean>(false);
  const [formData, setFormData] = useState<AddFormData>({
    name: "",
    userId: "",
    m2: "",
    address: "",
    image: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwt");
    if (jwtToken) {
      const userId: string = jwtToken;
      if (userId) {
        setFormData((prevData) => ({
          ...prevData,
          userId: userId,
        }));
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({
        ...formData,
        [name]: name === "m2" ? Number(value) : value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const adData = {
      name: formData.name,
      userId: formData.userId,
      m2: formData.m2,
      address: formData.address,
      image: formData.image,
      description: formData.description,
    };

    try {
      setLoading(true);
      const response = await axiosInstanceToApi.post("/ad/createAd", adData);
      setLoading(false);
      if (response.status === 200) {
        setShowAlertSuccess(true);
      } else {
        setShowAlertError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      setShowAlertError(true);
    }
  };

  const ongoing = () => {
    setShowAlertError(false);
    navigate(`/Home/${localStorage.getItem("jwt")}`);
  };

  if (loading) return <Loader />;

  return (
    <>
      <Nav
        type={
          localStorage.getItem("jwt") !== null ? "registered" : "unregistered"
        }
        logo={true}
      />
      <div
        style={{ marginBottom: "2.5%", marginTop: "5%", textAlign: "center" }}
      >
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl center">
          Add Ad
        </h2>
      </div>
      {showAlertSuccess && (
        <Alert message="Add created successfully!" onClose={ongoing} />
      )}
      {showAlertError && (
        <Alert
          message="Error...Please try again."
          onClose={() => setShowAlertError(false)}
        />
      )}
      <div
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: "10%",
        }}
      >
        <form onSubmit={handleSubmit} method="POST" className="mt-8">
          <div className="space-y-5">
            <div>
              <label className="text-base font-medium text-gray-900">
                Nume Anunț
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter the ad name"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="text-base font-medium text-gray-900">
                Metri Pătrați
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name="m2"
                  id="m2"
                  value={formData.m2}
                  onChange={handleChange}
                  placeholder="Enter square meters"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">
                Adresă
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">
                Descriere
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">
                Imagine
              </label>
              <div className="mt-2.5">
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleChange}
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
              >
                Adaugă Anunț
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddAd;
