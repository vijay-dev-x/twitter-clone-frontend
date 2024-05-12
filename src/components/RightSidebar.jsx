import React from "react";
import Avatar from "react-avatar";
import { ProfileSujjestion } from "../components/ProfileSujjestion";

export default function RightSidebar() {
  return (
    <div className=" w-[30%] border-2 h-[100vh] no overflow-y-scroll p-7">
      <div>
        <input
          className=" w-[80%] px-2 border-none outline-none bg-gray-100 rounded-md py-2"
          type="text"
          placeholder="serch here"
        />
      </div>
      <h1 className=" font-bold text-xl my-4">Who to follow</h1>

      <ProfileSujjestion></ProfileSujjestion>
    </div>
  );
}
