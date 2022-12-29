import React from "react";
import useTitle from "../../../hooks/useTitle";
import Products from "../../Products/Post";
import Divider from "../Divider/Divider";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Products></Products>
      <Divider></Divider>
    </div>
  );
};

export default Home;
