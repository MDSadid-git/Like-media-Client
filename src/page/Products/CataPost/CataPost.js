import React, { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const CataProducts = () => {
  useTitle("Cata Products");
  const datass = useLoaderData();
  console.log(datass);
  const [myEdit, setEdit] = useState([]);
  const navigate = useNavigate();
  // const handleUpDate = (id) => {
  //   navigate(`/EditPost/${id}`);
  // };

  return (
    <div>
      <div className="">
        <div className="flex justify-center">
          <div className="card w-2/4 glass mx-auto my-9">
            <figure>
              <img src={datass?.image} alt="car!" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{datass?.datePosted}</h2>
              <h2 className="card-title">{datass?.location}</h2>
              <p>Name: {datass?.name}</p>
              {datass.mood ? <p>Mood: {datass?.mood}</p> : ""}

              {datass.message ? <p>Post: {datass?.message}</p> : ""}
              {datass.datPosted ? <p>Date: {datass?.datPosted}</p> : ""}

              <hr />
              <div className="card-actions justify-start">
                {/* <div
                  onClick={() => handleUpDate(datass._id)}
                  className="badge badge-outline h-7"
                >
                  Edit
                </div> */}
                <Link to={`/editPost/${datass._id}`}>Edit</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CataProducts;
