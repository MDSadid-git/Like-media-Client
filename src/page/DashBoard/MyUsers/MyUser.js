import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useTitle from "../../../hooks/useTitle";
import ConfirmModal from "../../Shared/ConfirmModel/ConfirmModal";

const MyUser = () => {
  useTitle("My User");
  const [deletingUser, setDeletingUser] = useState(null);
  const closeModle = () => {
    setDeletingUser(null);
  };

  const { data: userData = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/users`);
      const data = res.json();
      return data;
    },
  });
  const handleAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make admin successfully");
          refetch();
        }
      });
  };
  const handleVerify = (id) => {
    fetch(`http://localhost:5000/users/verify/${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("User Verify successfully");
          refetch();
        }
      });
  };
  const handleDeletuser = (user) => {
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Delete Success");
          refetch();
        }
      });
  };
  return (
    <div>
      <h2 className="text-4xl text-center my-5">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>specialty</th>
              <th>Veryfi</th>
              <th> Addmin</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user, i) => (
              <tr className="hover" key={user._id}>
                <th>{i + 1}</th>
                <th>{user?.name}</th>
                <td>{user?.email}</td>
                <td>{user?.specialty ? user.specialty : "Buyer"}</td>
                <td>
                  {user?.verify !== "verify" ? (
                    <p
                      onClick={() => handleVerify(user._id)}
                      className="text-red-700 font-extrabold"
                    >
                      UnVerify
                    </p>
                  ) : (
                    <p className="text-green-800 font-extrabold">Verify</p>
                  )}
                </td>
                <td>
                  {user?.role !== "admin" && (
                    <button
                      onClick={() => handleAdmin(user._id)}
                      className="btn btn-xs btn-secondary"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <label
                    onClick={() => setDeletingUser(user)}
                    htmlFor="deletemodal"
                    className="btn btn-xs btn-warning rounded-full"
                  >
                    X
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deletingUser && (
        <ConfirmModal
          title={`Are you sure you want to delete`}
          message={`If you delet never come again: ${deletingUser.name}`}
          closeModle={closeModle}
          deletingUser={deletingUser}
          successButoonName={`Delete!`}
          handleDeletuser={handleDeletuser}
        ></ConfirmModal>
      )}
    </div>
  );
};

export default MyUser;
