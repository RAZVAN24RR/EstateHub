import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import LogoImg from "../assets/Estatehub.webp";
import Nav from "../Components/Nav";
import { useParams } from "react-router-dom";
import axiosInstanceToApi from "../api/networking";

const AddDetail: React.FC<{}> = () => {
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstanceToApi.get(`/ad/getAdById/${id}`);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

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
