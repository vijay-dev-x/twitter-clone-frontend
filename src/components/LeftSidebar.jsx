import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getAllOthersTweets,
  getIdUser,
  getIsFollowingTweets,
  getOtherUsers,
  getRefresh,
  getUser,
  getUsersShow,
} from "../redux/UserSlice";
import { GoHomeFill } from "react-icons/go";
import { MdExplore } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { MdMail } from "react-icons/md";
import { VscListSelection } from "react-icons/vsc";
import { BsTwitterX } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";

const iconsList = [
  {
    icon: <IoNotifications></IoNotifications>,
    text: "Notification",
  },
  {
    icon: <VscListSelection></VscListSelection>,
    text: "Lists",
  },
  {
    icon: <BsTwitterX></BsTwitterX>,
    text: "Primium",
  },
  {
    icon: <CgMoreO></CgMoreO>,
    text: "More",
  },
];
import axios from "axios";
import toast from "react-hot-toast";
import { getAllUsers } from "../hooks/useHooks";
import { TwitterSource } from "react-avatar";

export default function LeftSidebar() {
  const refreshSelector = useSelector((store) => store.user.refresh);
  const dispatch = useDispatch();

  const loggedUserId = useSelector((store) => store.user?.user?.user?._id);
  // console.log("left id -", loggedUserId);
  const navigate = useNavigate();
  const goToHomeHandler = () => {
    navigate("/");
  };
  const goToProfileHandler = () => {
    navigate(`/profile/${loggedUserId}`);
    dispatch(getRefresh(false));
  };
  // Logout api ------------
  const logoutApi = async () => {
    try {
      const res = await axios.get(
        "https://twitter-clone-backend-ycez.onrender.com/api/logout"
      );
      toast.success(res?.data?.msg);
      navigate("/login");
      dispatch(getRefresh(null));
      dispatch(getUser(null));
      dispatch(getIdUser(null));
      dispatch(getAllOthersTweets(null));
      dispatch(getIsFollowingTweets(null));
      dispatch(getOtherUsers(null));
      dispatch(getAllUsers(null));
    } catch (error) {
      console.log(error);
    }
  };

  // logoutHandler ------
  const logOutHandler = () => {
    logoutApi();
  };
  // go to messgaes-
  const goToMessages = () => {
    navigate("/messages");
  };
  // go to users for mobile
  const openUsers = () => {
    dispatch(getUsersShow(!false));
  };

  return (
    <div className=" md:w-[25%] w-[20%]  border-2 h-[100vh]">
      <div className="mx-auto w-[70%]">
        <div className=" md:px-10 px-3   mt-5 py-2">
          <Link to={"/"}>
            <p>
              <BsTwitterX className=" text-3xl md:text-4xl  cursor-pointer"></BsTwitterX>{" "}
            </p>
          </Link>
        </div>
        <div className="">
          <div
            onClick={goToHomeHandler}
            className=" flex md:px-10 px-3  gap-10 cursor-pointer  mt-7"
          >
            <p className=" text-3xl">
              <GoHomeFill className=" text-[1.6rem]"></GoHomeFill>
            </p>
            <p className=" hidden md:flex  font-semibold text-xl">Home</p>
          </div>
          <div
            onClick={goToMessages}
            className=" flex md:px-10 px-3  gap-10 cursor-pointer  mt-7"
          >
            <p className=" text-3xl">
              <MdMail className=" text-[1.6rem]"></MdMail>
            </p>
            <p className="  hidden md:flex font-semibold text-xl">Messages</p>
          </div>
          <div
            onClick={openUsers}
            className=" flex md:hidden md:px-10 px-3  gap-10 cursor-pointer  mt-7"
          >
            <p className=" text-3xl">
              <MdExplore className=" text-[1.6rem]"></MdExplore>
            </p>
            <p className="  hidden md:flex font-semibold text-xl">Users</p>
          </div>
          {iconsList.map((value, index) => {
            return (
              <div
                key={index}
                className=" cursor-not-allowed md:px-10 px-3  mx-auto my-7 flex gap-10"
              >
                <p className=" text-[1.6rem] md:text-3xl">{value.icon}</p>
                <p className="  hidden md:flex font-semibold text-xl">
                  {value.text}
                </p>
              </div>
            );
          })}
          <div>
            <div
              onClick={goToProfileHandler}
              className=" flex md:px-10 px-3  gap-10 cursor-pointer"
            >
              <p className="text-[1.6rem] md:text-3xl">
                <CgProfile></CgProfile>
              </p>
              <p className="  hidden md:flex font-semibold text-xl">Profile</p>
            </div>

            <div
              onClick={logOutHandler}
              className="md:px-10 items-center p-2  md:hover:bg-sky-500 outline-none my-12 text-white font-semibold md:bg-sky-400 rounded-full flex gap-5 cursor-pointer"
            >
              <p className=" text-black md:text-white  text-3xl mx-auto">
                <IoMdLogOut></IoMdLogOut>
              </p>
              <p className=" hidden md:flex">Logout</p>
            </div>

            <p></p>
          </div>
        </div>
      </div>
    </div>
  );
}
