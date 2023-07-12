import React from "react";
import Post from "./post/Post";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Register from "../signinup/Register";
import Login from "../signinup/Login";
import UserContextProvider from "../UserContextProvider";
import CreatePost from "./post/CreatePost";
import PostView from "./post/PostView";
import PostAnswer from "./post/PostAnswer";
import ProtectedRoute from "./ProtectedRoute";
import UpdatePost from "./post/UpdatePost";

const Home = () => {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path={"/"} element={<Layout />} >
            <Route index element={<Post />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/register"} element={<Register />} />


            <Route path={"/createNewPost"} element={<CreatePost />} />
            <Route path={"/updatePost/:id"} element={<UpdatePost />} />
            <Route path={"/post/:id"} element={<PostView />} />
            <Route path={"/postAnswer/:id"} element={<PostAnswer />} />
          </Route>
        </Routes>
      </UserContextProvider>
    </>
  );
};

export default Home;
