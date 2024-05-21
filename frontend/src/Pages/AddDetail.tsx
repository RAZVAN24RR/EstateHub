import React from "react";
import Footer from "../Components/Footer";
import LogoImg from "../assets/Estatehub.webp";
import Nav from "../Components/Nav";

const AddDetail: React.FC<{}> = () => {
  return (
    <>
      <Nav
        type={
          localStorage.getItem("jwt") !== null ? "registered" : "unregistered"
        }
        logo={true}
      />
      <div>Add</div>
    </>
  );
};

export default AddDetail;
