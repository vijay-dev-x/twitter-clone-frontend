import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Feed from "./Feed";
import Profile from "./Profile";
import Login from "./Login";
import Home from "./Home";
import EditProfile from "./EditProfile";
import Messages from "./Messages";

export default function routing() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      children: [
        {
          path: "/",
          element: <Feed></Feed>,
        },
        {
          path: "/profile/:params",
          element: <Profile></Profile>,
        },
        {
          path: "/editprofile/:params",
          element: <EditProfile></EditProfile>,
        },
        {
          path: "/messages",
          element: <Messages></Messages>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter}></RouterProvider>
    </div>
  );
}
