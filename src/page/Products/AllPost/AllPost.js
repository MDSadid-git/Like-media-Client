import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Products from "../Post";

const AllPost = () => {
  const [myAllPost, setMyAllpost] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/myallPost`)
      .then((res) => res.json())
      .then((data) => setMyAllpost(data));
  }, []);
  console.log(myAllPost);
  return (
    <div>
      <Products></Products>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {myAllPost.map((ses, i) => (
          <>
            <div className="card w-4/5 glass mx-auto my-9" key={i}>
              <figure>
                <img src={ses.image} alt="car!" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{ses.datePosted}</h2>
                <h2 className="card-title">{ses.message}</h2>
                <p>Name: {ses.name}</p>
                <p>OriginalPrice: {ses.originalPrice}</p>
                <p>ResalePrice: {ses.resalePrice}</p>
                <h2 className="card-title">Seller: {ses.sellerName}</h2>
                <hr />
                <Link to={`/myEditPost/${ses._id}`}>
                  <button className="btn btn-secondary">details</button>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
