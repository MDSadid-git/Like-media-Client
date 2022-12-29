import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../page/Home/Home/Home";
import Login from "../page/Login/Login";
import AddPost from "../page/Products/AddPost/AddPost";
import CataPost from "../page/Products/CataPost/CataPost";
import MyCataPost from "../page/Products/CataPost/MyCataPost";
import Post from "../page/Products/Post";
import DisplayError from "../page/Shared/MYError/DisplayError";
import Singup from "../page/Singup/Singup";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PostAll from "../page/Products/AllPost/AllPost";
import EditPost from "../page/Products/EditPost/EditPost";
import MyEditPost from "../page/Products/myEditPost/MyEditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/singup",
        element: <Singup></Singup>,
      },
      {
        path: "/products",
        element: <Post></Post>,
      },
      {
        path: "/allpost",
        element: <PostAll></PostAll>,
      },
      {
        path: "/addpost",
        element: <AddPost></AddPost>,
      },
      {
        path: "/catapost/:id",
        element: (
          <PrivateRoute>
            {" "}
            <CataPost></CataPost>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/resaleApple/${params.id}`),
      },
      {
        path: "/EditPost/:id",
        element: (
          <PrivateRoute>
            <EditPost></EditPost>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/editPost/${params.id}`),
      },
      {
        path: "/myEditPost/:id",
        element: (
          <PrivateRoute>
            <MyCataPost></MyCataPost>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/myEditPost/${params.id}`),
      },
      {
        path: "/PostUpdate/:id",
        element: (
          <PrivateRoute>
            <MyEditPost></MyEditPost>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/PostUpdate/${params.id}`),
      },
    ],
  },
]);
export default router;
