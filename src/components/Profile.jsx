import { useEffect } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getFollowingUpdate, getIdUser, getRefresh } from "../redux/UserSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineCalendarMonth } from "react-icons/md";

export default function Profile() {
  const refreshSelector = useSelector((store) => store.user.refresh);
  const loggedUser = useSelector((store) => store.user.idUser);
  // console.log("logged user", loggedUser);
  const currentUserId = useSelector((store) => store?.user?.user?.user?._id);
  const navigate = useNavigate();

  const currentUser = useSelector((store) => store?.user?.user?.user);
  console.log("current user-", currentUser);
  // console.log("logged user -", loggedUser);
  const id = useParams().params;
  // console.log("params-", id);
  const dispatch = useDispatch();

  // indivisual profile api ------

  const individualProfile = async () => {
    try {
      const res = await axios.get(
        `https://twitter-clone-backend-ycez.onrender.com/api/profile/${id}`
      );
      console.log("profile compo idUser-", res?.data);
      dispatch(getIdUser(res?.data));
    } catch (error) {
      console.log(error);
    }
  };
  const followUnfollowHandler = async () => {
    if (currentUser?.following?.includes(id)) {
      try {
        const res = await axios.put(
          `https://twitter-clone-backend-ycez.onrender.com/unfollow/${id}`,
          {
            id: currentUserId,
          }
        );
        console.log(" user unfollow-", res?.data);

        dispatch(getFollowingUpdate(id));
        dispatch(getRefresh(false));
        // dispatch(getRefresh(false));
      } catch (error) {
        console.log(error);
      }
    }
    if (!currentUser?.following.includes(id)) {
      try {
        const res = await axios.put(
          `https://twitter-clone-backend-ycez.onrender.com/api/follow/${id}`,
          {
            id: currentUserId,
          }
        );
        console.log("current user follow", res?.data);
        dispatch(getFollowingUpdate(id));
        dispatch(getRefresh(false));
        // dispatch(getRefresh(false));
      } catch (error) {
        console.log(error);
      }
    }
  };
  // format date function
  const formatDate = (createdAt) => {
    const date = new Date(createdAt);

    // Options for date and time formatting
    const dateOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    // Format date and time
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    return `${formattedDate}, ${formattedTime}`;
  };
  // edit profile handler
  const editProfileHandler = (e) => {
    // console.log(e);
    navigate(`/editprofile/${e}`);
  };

  // useEffect ---------

  useEffect(() => {
    individualProfile();
  }, [refreshSelector, id]);

  return (
    // <h1>hello</h1>
    <div className=" w-[45%] mt-0">
      <div>
        <div>
          <img
            className="relative"
            src="https://pbs.twimg.com/profile_banners/4482588140/1645885393/1080x360"
            alt=""
          />
        </div>
        <div className=" flex justify-between px-4 items-center">
          <Avatar
            className=" relative top-[-15px] border-4 border-white rounded-full"
            src="https://www.imilap.com/profileimages/profile_IMG_20170707_034945_547.jpg"
            size="140"
            round
          />

          {currentUserId === loggedUser?.user?._id ? (
            <button
              onClick={() => editProfileHandler(loggedUser?.user?._id)}
              className=" bg-sky-400 text-white font-semibold rounded-3xl px-8 py-3"
            >
              Edit Profile
            </button>
          ) : (
            // --------------------------------------------
            <button
              onClick={followUnfollowHandler}
              className=" bg-sky-400 text-white hover:bg-sky-500 font-bold rounded-3xl px-10 py-3"
            >
              {currentUser?.following.includes(id) ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className=" px-6">
          <h1 className=" text-xl font-semibold">{loggedUser?.user?.name}</h1>
          <p className=" text-gray-400">@{loggedUser?.user?.username}</p>
        </div>
        <div className=" px-5 py-2 ">
          <p className=" text-[16px] text-gray-400 flex items-center gap-2">
            <span className=" text-gray-400">
              <MdOutlineCalendarMonth></MdOutlineCalendarMonth>
            </span>{" "}
            Joined {formatDate(loggedUser?.user?.createdAt)}
          </p>
        </div>
        <div className=" flex gap-5 my-4 px-5">
          <p className=" text-xl">
            {" "}
            {loggedUser?.user?.following.length}{" "}
            <span className=" text-gray-500">Following</span>
          </p>
          <p className=" text-xl">
            {loggedUser?.user?.followers.length}{" "}
            <span className=" text-gray-500"> Followers </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
