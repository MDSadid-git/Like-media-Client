import React from "react";

const EditInSide = ({
  rev: { customer, email, message, _id },
  user,
  handleDelete,
  handleUpDate,
}) => {
  return (
    <div className="flex justify-center">
      <div className="card w-96 bg-base-100 shadow-xl my-10">
        <figure>
          {user?.photoURL ? (
            <img src={`${user.photoURL}`} alt="Shoes" />
          ) : (
            "photos missing"
          )}
        </figure>
        <div className="card-body">
          <h2 className="card-title">{email}</h2>
          <h2 className="card-title">{customer}</h2>
          <p>{message}</p>
          <div className="card-actions justify-end">
            <div
              onClick={() => handleDelete(_id)}
              className="badge badge-outline h-7 rounded-full"
            >
              X
            </div>
            <div
              onClick={() => handleUpDate(_id)}
              className="badge badge-outline h-7"
            >
              Edit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInSide;
