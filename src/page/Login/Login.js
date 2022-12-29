import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import useTitle from "../../hooks/useTitle";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useToken from "../../hooks/useToken";
import { AuthContext } from "../../UserContext/UserContext";
import "./style.css";

const googleProvider = new GoogleAuthProvider();
const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const [loginUserEmail, setLoginUserEmail] = useState("");
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const from2 = location.state?.from?.pathname || "/";
  useTitle("Loging");
  if (token) {
    navigate(from2, { replace: true });
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const logInHandle = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        toast.success("Login success !!!");
        setLoginUserEmail(data.email);
      })
      .catch((error) => {
        console.log(error.message);
        setLoginError(error.message);
      });
  };
  const UserGoogle = () => {
    signInWithGoogle(googleProvider)
      .then((resul) => {
        const user = resul.user;
        toast.success("Login success!!!");
        setLoginUserEmail(user.email);
      })
      .catch((e) => console.error(e));
  };
  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="bg-slate-100 rounded-xl boxColor">
        <div className="w-96 p-7">
          <h3 className="text-xl text-center">Login</h3>
          <form className="" onSubmit={handleSubmit(logInHandle)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered w-full "
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                className="input input-bordered w-full "
                {...register("password")}
              />
            </div>

            <input
              className="btn btn-secondary w-full text-white mt-5"
              type="submit"
              value={`LogIn`}
            />
            <div>
              {loginError && <p className="text-red-600">{loginError}</p>}
            </div>
          </form>
          <p className="mt-5">
            New to Like Media{" "}
            <Link className="text-secondary" to={"/singup"}>
              Creat new Account
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

export default Login;
