import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/UserSlice";
export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  // form handler -----
  const formHandler = async () => {
    if (!isLogin) {
      try {
        const res = await axios.post(
          "https://twitter-clone-backend-ycez.onrender.com/api/register",
          {
            name,
            username,
            email,
            password,
          }
        );
        console.log(res);
        if (res.data.status) {
          setIsLogin(true);
          toast.success(res.data.msg);
        }
      } catch (error) {
        console.log("error login");
        console.log(error);
        toast.error(error?.response?.data?.msg);
      }
    } else {
      try {
        const res = await axios.post(
          "https://twitter-clone-backend-ycez.onrender.com/api/login",
          {
            email,
            password,
          }
        );
        // console.log(res);
        if (res.data.status) {
          toast.success(res.data.msg);
          navigate("/");
          dispatch(getUser(res?.data));
        }
      } catch (error) {
        toast.error(error?.response?.data?.msg);
        console.log(error);
      }
    }
  };
  const handelIsLogin = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className=" flex-col md:flex md:flex-row w-[100%] p-10 items-center h-[100vh] px-5">
      <div className=" w-full  md:w-[50%]">
        <img
          className=" mx-auto w-[30%] md:w-[50%]"
          src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png.png"
          alt=""
        />
      </div>
      <div className="  w-full mt-16 md:mt-0 md:w-[50%] ">
        <div className="  flex  flex-col gap-3 items-center">
          <div>
            <h1 className=" text-[1.7rem] md:text-[4em] py-2 md:py-5 whitespace-nowrap font-bold">
              Heppening now
            </h1>

            {isLogin ? (
              <h1 className=" text-[1.2rem] md:text-[2em] text-center font-bold">
                Login here
              </h1>
            ) : (
              <h1 className=" text-[1.2rem] md:text-[2em] text-center font-bold">
                Join today
              </h1>
            )}
          </div>
          <form></form>
          {!isLogin && (
            <>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className=" px-10 py-2 outline-none border rounded-2xl "
                type="text"
                placeholder=" Enter your Name"
              />

              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className=" px-10 py-2 outline-none border rounded-2xl "
                type="text"
                placeholder=" Enter your username"
              />
            </>
          )}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" px-10 py-2 outline-none border rounded-2xl "
            type="text"
            placeholder=" Enter your Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" px-10 py-2 outline-none border rounded-2xl "
            type="text"
            placeholder=" Enter your Password"
          />
          <button
            onClick={formHandler}
            className=" bg-sky-400 my-5 text-white font-semibold px-10 py-2 rounded-3xl"
          >
            {isLogin ? "Login" : "SignUp"}
          </button>
          <button
            onClick={handelIsLogin}
            className=" text-gray-600 cursor-default px-5"
          >
            {isLogin ? (
              <p>
                Don't have an account?
                <span className=" cursor-pointer ml-1 text-blue-400 font-semibold">
                  {" "}
                  SignUP here!
                </span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span className=" cursor-pointer ml-1 text-blue-400 font-semibold">
                  {" "}
                  Signin here!
                </span>
              </p>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
