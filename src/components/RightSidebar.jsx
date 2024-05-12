import React from "react";
import Avatar from "react-avatar";
import { ProfileSujjestion } from "../components/ProfileSujjestion";
import { useSelector } from "react-redux";

export default function RightSidebar() {
  const userShow = useSelector((store) => store.user.usersShow);

  return (
    <div
      className={` ${
        userShow ? "block" : " hidden"
      }  w-[78%] md:block md:w-[30%] border-2 h-[100vh] no overflow-y-scroll p-7`}
    >
      <div>
        <input
          className=" w-[100%] md:w-[80%] px-2 border-none outline-none bg-gray-100 rounded-md py-2"
          type="text"
          placeholder="serch here"
        />
      </div>
      <h1 className=" font-bold text-xl my-4">Who to follow</h1>

      <ProfileSujjestion></ProfileSujjestion>
    </div>
  );
}
