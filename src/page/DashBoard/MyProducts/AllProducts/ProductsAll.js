import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useTitle from "../../../../hooks/useTitle";
import BookModal from "../../../Products/BookModal/BookModal";
import Products from "../../../Products/Products";

const ProductsAll = () => {
  useTitle("All products");
  const { data: randomProducts = [] } = useQuery({
    queryKey: ["porducts"],
    queryFn: async () => {
      try {
        const res = await fetch(`http://localhost:5000/porducts`, {
          headers: {
            "content-type": "application/json",
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const datass = useLoaderData();
  const [myModle, setMyModle] = useState(null);
  const handleBook = (data) => {
    setMyModle(data);
  };

  return (
    <div>
      <Products></Products>
      <div className="my-10">
        <h2 className="text-4xl text-center  text-pink-600  font-extrabold">
          Random Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
          {randomProducts.map((ses, i) => (
            <>
              <div className="card w-4/5 glass mx-auto my-9" key={i}>
                <figure>
                  <img src={ses?.image} alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{ses?.datePosted}</h2>
                  <h2 className="card-title">{ses?.location}</h2>
                  <p>Name: {ses?.name}</p>
                  <p>OriginalPrice: {ses?.originalPrice}</p>
                  <p>ResalePrice: {ses?.resalePrice}</p>
                  <h2 className="card-title">Seller: {ses?.sellerName}</h2>
                  <hr />
                  <div className="card-actions justify-start">
                    <label
                      onClick={() => handleBook(ses)}
                      htmlFor="my-modal"
                      className="btn"
                    >
                      Book Now
                    </label>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <BookModal myModle={myModle}></BookModal>
    </div>
  );
};

export default ProductsAll;
