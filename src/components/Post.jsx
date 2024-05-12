import { useEffect } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { getAllOthersTweets, getRefresh } from "../redux/UserSlice";
import axios from "axios";
import toast from "react-hot-toast";
import { getTimeSinceCreation } from "../customFunc/CutomFunc";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { IoMdRepeat } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";

export default function Post() {
  const isFollowing = useSelector((store) => store.user.followingTweets);
  // console.log("post isFollowing", isFollowing);
  const userId = useSelector((store) => store.user.user?.user?._id);
  const refreshSelector = useSelector((store) => store.user.refresh);
  // console.log("refresh--", refreshSelector);

  const dispatch = useDispatch();

  const tweets = useSelector((store) => store.user?.allOthersTweets?.tweets);

  // all tweets---

  const fetchTweets = async () => {
    try {
      const res = await axios.get(
        `https://twitter-clone-backend-ycez.onrender.com/api/alltweets/${userId}`
      );
      dispatch(getAllOthersTweets(res?.data));
      console.log("post compo allTweets-", res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // like and dislike -------

  const LikeDislikeHandler = async (paraId) => {
    try {
      const res = await axios.put(
        `https://twitter-clone-backend-ycez.onrender.com/api/like/${paraId}`,
        {
          id: userId,
        }
      );
      dispatch(getRefresh(false));
      toast.success(res?.data?.msg);
      console.log("post compo like-", res?.data);
    } catch (error) {
      console.log(error);
    }
  };
  // delete api --------
  const deleteHandler = async (paraId) => {
    try {
      const res = await axios.delete(
        `https://twitter-clone-backend-ycez.onrender.com/api/delete/${paraId}`
      );
      console.log("deleted-", res);
      dispatch(getRefresh(false));
      toast.success(res?.data?.msg);
    } catch (error) {
      console.log(error);
    }
  };
  // use effect --------
  useEffect(() => {
    if (!isFollowing) {
      fetchTweets();
    }
  }, [refreshSelector]);
  return tweets?.map((value, index) => (
    <div key={index} className=" py-4 p-2 border-b  mx-auto">
      <div className=" flex justify-between">
        <div className=" flex gap-2 items-center">
          <Avatar
            src="https://www.imilap.com/profileimages/profile_IMG_20170707_034945_547.jpg"
            size="40"
            round
          />
          <div>
            <div className="">
              <div className=" flex items-center gap-2">
                <h2 className=" text-[18px]">{value?.userDetails?.name}</h2>
                <p className=" text-gray-400 text-[14px]">
                  @{value?.userDetails?.username}
                </p>
              </div>
              <p className=" text-gray-400 text-[14px]">
                {getTimeSinceCreation(value?.createdAt)}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className=" text-xl">
            <BsThreeDots></BsThreeDots>
          </p>
        </div>
      </div>
      <div className=" my-5">
        <p>{value?.description}</p>
      </div>
      <div className=" flex  items-center justify-between">
        <p
          className=" cursor-pointer hover:text-sky-500 pl-5 text-[17px] flex gap-2 items-center"
          onClick={() => LikeDislikeHandler(value?._id)}
        >
          <span>
            <IoIosHeartEmpty></IoIosHeartEmpty>
          </span>
          {value?.like?.length}
        </p>
        <p>
          <FaRegComment></FaRegComment>
        </p>
        <p>
          <IoMdRepeat></IoMdRepeat>
        </p>
        <p>
          <CiBookmark></CiBookmark>
        </p>
        {value?.userid === userId ? (
          <p
            className=" cursor-pointer hover:text-red-600 pr-5 text-xl"
            onClick={() => deleteHandler(value?._id)}
          >
            <MdDeleteForever></MdDeleteForever>
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  ));
}
