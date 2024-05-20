import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../../assets/Estatehub.webp";
import axiosInstanceToApi from "../../api/networking";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";
import UserInterfaceLogin from "../../Interfaces/UserInterfaceLogin";
import Loader from "../../Components/Loader";
import Nav from "../../Components/Nav";
import Alert from "../../Components/Alert";

const Login: React.FC<{}> = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const [user, setUser] = useState<UserInterfaceLogin>({
    email: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState<Boolean>(false);

  const navigate = useNavigate();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axiosInstanceToApi.post("/session/", {
        email: user.email,
        password: user.password,
      });
      setLoading(false);
      if (response.data) {
        localStorage.setItem("jwt", response.data);
        navigate(`/Home/${response.data}`);
      } else {
        setShowAlert(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <section className="bg-white">
        <Nav type="unregistered" logo={false} />
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
              <div style={{ marginBottom: "10%" }}>
                <img
                  src={Logo}
                  width={100}
                  height={100}
                  style={{ borderRadius: "20px" }}
                />
              </div>

              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                Sign in to EstateHub
              </h2>
              <p className="mt-2 text-base text-gray-600">
                Start for free today{" "}
                <Link
                  to="/register" // Asigură-te că ruta este corectă
                  className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700"
                >
                  Create an account
                </Link>
              </p>
              {showAlert && (
                <Alert
                  message="Error...Please try again."
                  onClose={() => setShowAlert(false)}
                />
              )}
              <form onSubmit={handleSubmit} method="POST" className="mt-8">
                <div className="space-y-5">
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
                        placeholder="Enter email"
                        onChange={handleEmailChange}
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
                        placeholder="Enter your password"
                        onChange={handlePasswordChange}
                        className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700"
                    >
                      Log in
                    </button>
                  </div>
                </div>
              </form>

              <div className="mt-3 space-y-3"></div>
            </div>
          </div>

          <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
              <img
                className="w-full mx-auto"
                src="media/Endpoint-cuate.svg"
                alt=""
              />

              <div className="w-full max-w-md mx-auto xl:max-w-xl">
                <h3 className="text-2xl font-bold text-center text-black">
                  Start monitoring the real estate market now!
                </h3>
                <p className="leading-relaxed text-center text-gray-500 mt-2.5">
                  Publish your ad and you can explore the market.
                </p>

                <div className="flex items-center justify-center mt-10 space-x-3">
                  <div className="bg-gray-200 rounded-full w-20 h-1.5"></div>
                  <div className="bg-orange-500 rounded-full w-12 h-1.5"></div>
                  <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
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

export default Login;
