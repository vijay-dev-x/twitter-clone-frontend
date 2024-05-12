import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  getAllOthersTweets,
  getIsFollowingTweets,
  getRefresh,
} from "../redux/UserSlice";

export default function Feed() {
  const refreshSelector = useSelector((store) => store.user.refresh);
  const dispatch = useDispatch();
  const isFollowing = useSelector((store) => store.user.followingTweets);

  const [description, setDescription] = useState("");
  const loggedUserId = useSelector((store) => store.user?.user?.user?._id);

  const newTweet = async () => {
    if (description === "") {
      toast.error("Tweet cant't be empty");
    } else {
      try {
        const res = await axios.post(
          "https://twitter-clone-backend-ycez.onrender.com/api/tweet",
          {
            description: description,
            userid: loggedUserId,
          }
        );
        toast.success(res?.data?.msg);
        dispatch(getRefresh(true));
      } catch (error) {
        console.log(error);
      }
    }
  };
  // following tweets api -------

  const fetchFollowingTweets = async () => {
    try {
      const res = await axios.get(
        `https://twitter-clone-backend-ycez.onrender.com/api/followingtweets/${loggedUserId}`
      );
      dispatch(getAllOthersTweets(res?.data));
    } catch (error) {
      console.log(error);
    }
  };

  // create post handler
  const postHandler = () => {
    console.log(description);
    newTweet();
    setDescription("");
  };
  // following  tweets handler

  const followingTweetsHandler = () => {
    dispatch(getIsFollowingTweets(true));
    dispatch(getRefresh(false));
  };
  // for you handler  -----

  const forYouHandler = () => {
    dispatch(getIsFollowingTweets(false));
    dispatch(getRefresh(false));
  };
  // use effect ----
  useEffect(() => {
    if (isFollowing) {
      fetchFollowingTweets();
    }
  }, [refreshSelector]);
  return (
    <div className=" px-3 w-[45%] h-[95vh] overflow-y-scroll no-scrollbar ">
      <div className=" flex sticky top-0 bg-white  justify-evenly border-b pb-2">
        <p
          onClick={forYouHandler}
          className={`${
            !isFollowing ? " border-b-2 border-blue-400" : ""
          } hover:bg-gray-200  text-xl  cursor-pointer py-2 text-center w-[50%]`}
        >
          For you
        </p>
        <p
          onClick={followingTweetsHandler}
          className={`${
            isFollowing ? " border-b-2 border-blue-400" : ""
          } hover:bg-gray-200  text-xl  cursor-pointer py-2 text-center w-[50%]`}
        >
          Following
        </p>
      </div>
      <div className=" flex my-3 gap-3">
        <img
          className=" w-10 h-10 bg-cover rounded-full"
          src="https://www.imilap.com/profileimages/profile_IMG_20170707_034945_547.jpg"
          alt=""
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className=" border-none py-1 w-[90%] outline-none text-xl"
          type="text"
          placeholder="what is heppening?!"
        />
      </div>
      <div className=" flex my-5  py- justify-end items-center pb-5 border-b">
        <button
          onClick={postHandler}
          className=" hover:bg-sky-500 bg-sky-400 text-white rounded-full font-semibold px-8 py-2"
        >
          Post
        </button>
      </div>
      <div>
        <Post></Post>
      </div>
    </div>
  );
}
