import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../hooks/useHooks";
import { getRefresh } from "../redux/UserSlice";

export const ProfileSujjestion = () => {
  const dispatch = useDispatch();

  const userId = useSelector((store) => store?.user?.user?.user?._id);
  // console.log("profileSujjestion id--", userId);
  const getALL = getAllUsers(userId);

  const allUsers = useSelector((store) => store?.user?.otherUsers?.allUser);
  // console.log("profileSujjestion component-", allUsers);
  const navigate = useNavigate();
  useEffect(() => {
    getALL;
    allUsers;
  }, [userId]);
  // goToProfileHandler------

  const goToProfileHandler = (paramsId) => {
    navigate(`/profile/${paramsId}`);
    dispatch(getRefresh(false));
  };
  return (
    // <h2>hello2</h2>
    <div className="">
      {allUsers?.map((value, index) => (
        <div key={value?._id} className=" my-3 ">
          <div className="   w-[90%] justify-between flex gap-3">
            <div className=" flex gap-4 items-center">
              {/* <Avatar
                src="https://www.imilap.com/profileimages/profile_IMG_20170707_034945_547.jpg"
                size="40"
                round
              /> */}
              <h1
                className=" p-3 uppercase text-center
               w-[2.5em] h-[2.5em] rounded-full text-xl font-bold bg-sky-300 text-white"
              >
                {value?.name.charAt(0)}
              </h1>

              <div>
                <h1 className=" text-xl font-semibold">{value?.name}</h1>
                <p className=" text-gray-400 mt-[-1px]">@{value?.username}</p>
              </div>
            </div>

            <div>
              <button
                onClick={() => goToProfileHandler(value?._id)}
                // onClick={() => navigate(`/profile/${value?._id}`)}
                className=" px-5 font-semibold hover:bg-gray-800 py-2 rounded-full bg-gray-700 text-white"
              >
                Profile
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
