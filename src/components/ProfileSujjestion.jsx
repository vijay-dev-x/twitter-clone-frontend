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
    <div className="">
      {allUsers?.map((value) => (
        <div key={value?._id} className=" my-3 ">
          <div className="   w-[90%] justify-between flex gap-3">
            <div className=" flex gap-4 items-center">
              <h1
                className=" p-1 flex justify-center items-center md:p-3 uppercase text-center
              w-[2.5em] h-[2.5em] rounded-full text-sm md:text-xl font-bold bg-sky-300 text-white"
              >
                {value?.name.charAt(0)}
              </h1>

              <div>
                <h1 className=" text-[15px] md:text-xl font-semibold">
                  {value?.name}
                </h1>
                <p className=" text-[12px] text-gray-400 mt-[-1px]">
                  @{value?.username}
                </p>
              </div>
            </div>

            <div>
              <button
                onClick={() => goToProfileHandler(value?._id)}
                // onClick={() => navigate(`/profile/${value?._id}`)}
                className=" px-3 py-1.5 md:px-5 font-semibold hover:bg-gray-800 md:py-2 rounded-full bg-gray-700 text-sm md:text-lg text-white"
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
