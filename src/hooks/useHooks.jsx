import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOthersTweets,
  getIdUser,
  getOtherUsers,
} from "../redux/UserSlice";
import { useEffect } from "react";

export const getAllUsers = async (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchGetAllUsers = async () => {
      const res = await axios.get(
        `https://twitter-clone-backend-ycez.onrender.com/api/allprofile/${id}`
      );
      dispatch(getOtherUsers(res?.data));
      //   console.log("use hook component-", res?.data);
    };
    fetchGetAllUsers();
  }, []);
};
