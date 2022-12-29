import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useTitle from "../../../hooks/useTitle";

const AddProducts = () => {
  useTitle("Add products");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const imageHostKey = "bbc26cb719fd267fbc7db673766bdeb9";
  const handleProducts = (data) => {
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((ImageData) => {
        if (ImageData.success) {
          const products = {
            email: data.email,
            name: data.name,
            message: data.location,
            mood: data.originalPrice,
            image: ImageData.data.url,
            datPosted: data.datePosted,
          };
          // save doctor information
          fetch(`http://localhost:5000/myPost`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(products),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              toast.success(`${data.name} is Added successfully`);
              navigate("/");
            });
        }
      });
  };
  return (
    <div>
      <h1 className="text-3xl text-center my-10 font-extrabold">
        Add New Post
      </h1>
      <div className=" flex justify-center items-center">
        <div className="w-3/6 p-7 bg-slate-100 rounded-xl">
          <form onSubmit={handleSubmit(handleProducts)}>
            <div className="flex md:flex-row flex-col">
              <div className="form-control w-5/6 max-w-xs mr-3">
                <label className="label">
                  {" "}
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.name && (
                  <p className="text-red-500">Name is required</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text">Mood</span>
                </label>
                <input
                  type="text"
                  {...register("originalPrice", {
                    required: "password is required",
                  })}
                  className="input input-bordered w-full max-w-xs"
                />
                {errors.originalPrice && (
                  <p className="text-red-500">{errors.originalPrice.message}</p>
                )}
              </div>
            </div>
            <div className="flex md:flex-row flex-col">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text">Post</span>
                </label>
                <input
                  type="text"
                  {...register("location", {
                    required: "password is required",
                  })}
                  className="input input-bordered w-full max-w-xs "
                />
                {errors.location && (
                  <p className="text-red-500">{errors.location.message}</p>
                )}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  {" "}
                  <span className="label-text ml-3">Date</span>
                </label>
                <input
                  type="text"
                  {...register("datePosted", {
                    required: "password is required",
                  })}
                  className="input input-bordered w-full max-w-xs ml-3"
                />
                {errors.datePosted && (
                  <p className="text-red-500">{errors.datePosted.message}</p>
                )}
              </div>
            </div>

            <div className="flex md:flex-row flex-col"></div>

            <div className="form-control w-full max-w-xs mx-auto">
              <label className="label">
                {" "}
                <span className="label-text">Image</span>
              </label>
              <input
                type="file"
                {...register("img", { required: true })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.img && <p className="text-red-500">Image is required</p>}
            </div>
            <input
              className="btn btn-secondary w-full my-4"
              value="Add Post"
              type="submit"
            />
            <div></div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
