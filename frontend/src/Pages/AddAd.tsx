import React from "react";
import Footer from "../Components/Footer";
import LogoImg from "../assets/Estatehub.webp";
import Nav from "../Components/Nav";

const AddAd: React.FC<{}> = () => {
  return (
    <>
      <Nav
        type={
          localStorage.getItem("jwt") !== null ? "registered" : "unregistered"
        }
        logo={true}
      />
      <div>Add</div>
      <Footer />
    </>
  );
};

export default AddAd;
