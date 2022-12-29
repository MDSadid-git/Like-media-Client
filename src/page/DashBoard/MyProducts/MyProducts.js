import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";
import { AuthContext } from "../../../UserContext/UserContext";

const MyProducts = () => {
  useTitle("My products");
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <progress className="progress w-56 mx-auto"></progress>;
  }
  return (
    <div>
      <h2 className="text-4xl text-center my-5">My Products List</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {bookings &&
              bookings?.map((book, i) => (
                <tr className="hover" key={book._id}>
                  <th>{i + 1}</th>
                  <th>{book?.productName}</th>
                  <td>{book?.email}</td>
                  <td>{book?.price}</td>
                  <td>
                    {book?.price && !book.paid && (
                      <Link to={`/dashboard/payment/${book._id}`}>
                        <button className="btn btn-secondary btn-xs">
                          Pay
                        </button>
                      </Link>
                    )}
                    {book?.price && book.paid && (
                      <button className="text-lime-700 font-bold">Paid</button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
