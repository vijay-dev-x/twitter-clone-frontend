import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRefresh } from "../redux/UserSlice";

export default function EditProfile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();

  const id = useParams().params;
  //   get profile api
  const getProfileInfo = async () => {
    const res = await axios.get(
      `https://twitter-clone-backend-ycez.onrender.com/api/profile/${id}`
    );
    setName(res?.data?.user?.name);
    setUsername(res?.data?.user?.username);
    setEmail(res?.data?.user?.email);
  };
  //   update profile api -----
  const updateProfile = async () => {
    try {
      if (name !== "" && email !== "" && password !== "" && username !== "") {
        const res = await axios.put(
          `https://twitter-clone-backend-ycez.onrender.com/api/updateprofile/${id}`,
          {
            name,
            username,
            email,
            password,
          }
        );
        toast.success(res?.data?.msg);
        navigate(`/profile/${id}`);
        dispatch(getRefresh(false));
      } else {
        toast.error("Plese fill all the fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // update handler  -----
  const updateHandler = () => {
    updateProfile();
  };
  //   useeffect
  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div className=" flex w-[65%] p-10 items-center h-[100vh] px-5">
      <div className="  w-[50%]">
        <img
          className=" mx-auto w-[65%]"
          src="data:image/png;base64,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"
          alt=""
        />
      </div>
      <div className="  w-[50%] ">
        <div className="  flex  flex-col gap-3 items-center">
          <div>
            <h1 className=" text-[2em] py-5 whitespace-nowrap font-bold">
              Update Profile
            </h1>
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=" px-10 py-3 outline-none border rounded-2xl "
            type="text"
            placeholder=" Enter your Name"
          />

          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className=" px-10 py-3 outline-none border rounded-2xl "
            type="text"
            placeholder=" Enter your username"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" px-10 py-3 outline-none border rounded-2xl "
            type="text"
            placeholder=" Enter your Email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" px-10 py-3 outline-none border rounded-2xl "
            type="text"
            placeholder=" Enter your Password"
          />
          <button
            onClick={updateHandler}
            className=" bg-sky-400 hover:bg-sky-500 my-5 text-white font-semibold px-10 py-3 rounded-3xl"
          >
            Update my profile
          </button>
        </div>
      </div>
    </div>
  );
}
