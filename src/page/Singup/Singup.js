import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTitle from "../../hooks/useTitle";
import useToken from "../../hooks/useToken";
import { AuthContext } from "../../UserContext/UserContext";

const googleProvider = new GoogleAuthProvider();

const Singup = () => {
  useTitle("SingUp");
  const { createUser, signInWithGoogle, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [createUserEmail, setCreateUserEmail] = useState("");
  const [token] = useToken(createUserEmail);
  const from2 = location.state?.from?.pathname || "/";
  if (token) {
    navigate(from2, { replace: true });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const singUpHandle = (data) => {
    console.log(data.email, data.password);
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        setCreateUserEmail(data.email);
        const userInfo = {
          displayName: data.name,
        };
        updateUser(userInfo)
          .then(() => {})
          .catch((err) => {
            console.log(err);
          });
        toast.success("Creat New Accoutn !!!");
        saveUser(data.email, data.name, data.specialty);
      })
      .catch((error) => {
        console.log(error.message);
        setSignUPError(error.message);
      });
  };
  const UserGoogle = () => {
    signInWithGoogle(googleProvider)
      .then((resul) => {
        const user = resul.user;
        toast.success("Creat New Accoutn !!!");
        saveUser(user.email, user.displayName);
        navigate(from2, { replace: true });
      })
      .catch((e) => console.error(e));
  };
  const saveUser = (email, name, specialty) => {
    const user = { email, name, specialty };
    fetch(`http://localhost:5000/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCreateUserEmail(email);
      });
  };

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="bg-slate-100 rounded-xl boxColor">
        <div className="w-96 p-7">
          <h3 className="text-xl text-center">Sing Up</h3>
          <form onSubmit={handleSubmit(singUpHandle)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && <p className="text-red-500">Name is required</p>}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "password is required" })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters long",
                  },
                  // pattern: {
                  //   value:
                  //     /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}/,
                  //   message: "Need a Storng passord",
                  // },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>

            <input
              className="btn btn-secondary w-full my-5"
              value="Sing up"
              type="submit"
            />
            <div></div>
            {signUpError && <p className="text-red-600">{signUpError}</p>}
          </form>
          <p>
            {" "}
            Already have an account{" "}
            <Link className="text-secondary" to="/login">
              Please Login
            </Link>
          </p>
          <div className="divider"></div>
          <button
            onClick={UserGoogle}
            className="btn btn-outline btn-info w-full"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Singup;
