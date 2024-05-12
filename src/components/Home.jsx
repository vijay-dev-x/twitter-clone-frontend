import React, { useEffect } from "react";
import LeftSidebar from "./LeftSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import { useSelector } from "react-redux";
export default function Home() {
  const currentUser = useSelector((store) => store?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex">
      <LeftSidebar />
      <Outlet />
      <RightSidebar />
    </div>
  );
}
