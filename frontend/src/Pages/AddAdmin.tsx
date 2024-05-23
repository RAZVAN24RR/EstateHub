import React, { useState, ChangeEvent } from "react";
import Footer from "../Components/Footer";
import LogoImg from "../assets/Estatehub.webp";
import Nav from "../Components/Nav";
import { useNavigate } from "react-router-dom";
import RegisterUserInterface from "../Interfaces/RegisterUserInterface";
import axiosInstanceToApi from "../api/networking";
import Loader from "../Components/Loader";
import Alert from "../Components/Alert";

const AddAdmin: React.FC<{}> = () => {
  const navigate = useNavigate();
  const [showAlertError, setShowAlertError] = useState<Boolean>(false);
  const [showAlertSuccess, setShowAlertSuccess] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);
  const [user, setUser] = useState<RegisterUserInterface>({
    name: "",
    email: "",
    password: "",
    image: "",
  });

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      email: event.target.value,
    }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      password: event.target.value,
    }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  };

  const signupUsers = async () => {
    try {
      console.log(user);
      setLoading(true);
      const response = await axiosInstanceToApi.post("/user/createUserAdmin", {
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
      });
      setLoading(false);
      if (response.status === 200) {
        setShowAlertSuccess(true);
      } else {
        setShowAlertError(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({
          ...user,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(files[0]);
    }
  };
  const ongoing = () => {
    setShowAlertSuccess(false);
    navigate(`/Home/${localStorage.getItem("jwt")}`);
  };

  if (loading)
    return (
      <>
        <Nav type="unregistered" logo={false} />
        <Loader />
      </>
    );
  return (
    <>
      <Nav
        type={
          localStorage.getItem("jwt") !== null ? "registered" : "unregistered"
        }
        logo={true}
      />
      {showAlertError && (
        <Alert
          message="Error...Please try again."
          onClose={() => setShowAlertError(false)}
        />
      )}
      {showAlertSuccess && (
        <Alert message="Cont creat." onClose={() => ongoing()} />
      )}
      <div
        style={{ marginBottom: "2.5%", marginTop: "5%", textAlign: "center" }}
      >
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl center">
          Ad ADMIN
        </h2>
      </div>

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
        <form onSubmit={signupUsers} method="POST" className="mt-8">
          <div className="space-y-5">
            <div>
              <label className="text-base font-medium text-gray-900">
                {" "}
                Full name{" "}
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  onChange={handleNameChange}
                  placeholder="Enter your full name"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>
            <div>
              <label className="text-base font-medium text-gray-900">
                {" "}
                Email address{" "}
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleEmailChange}
                  placeholder="Enter email"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-900">
                  {" "}
                  Password{" "}
                </label>
              </div>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handlePasswordChange}
                  placeholder="Enter your password"
                  className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-base font-medium text-gray-900">
                  {" "}
                  Password Confirmation{" "}
                </label>
              </div>
              <div className="mt-2.5">
                <input
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  placeholder="Verify password"
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
                ADD
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddAdmin;
