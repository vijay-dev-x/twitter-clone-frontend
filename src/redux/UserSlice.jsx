import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  otherUsers: null,
  idUser: null,
  allOthersTweets: null,
  refresh: true,
  followingTweets: false,
};
const UserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
    },
    getOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    getIdUser: (state, action) => {
      state.idUser = action.payload;
    },
    getAllOthersTweets: (state, action) => {
      state.allOthersTweets = action.payload;
    },
    getRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    getIsFollowingTweets: (state, action) => {
      state.followingTweets = action.payload;
    },
    getFollowingUpdate: (state, action) => {
      if (state.user.user.following.includes(action.payload))
        // unfollow
        state.user.user.following = state.user.user.following.filter(
          (itemId) => {
            return itemId !== action.payload;
          }
        );
      else {
        // follow
        state.user.user.following.push(action.payload);
      }
      state.followingTweets = action.payload;
    },
  },
});
export const {
  getUser,
  getOtherUsers,
  getIdUser,
  getAllOthersTweets,
  getRefresh,
  getIsFollowingTweets,
  getFollowingUpdate,
} = UserSlice.actions;
export default UserSlice.reducer;
