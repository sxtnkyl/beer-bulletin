import React from 'react';
import CreatePostForm from "../components/forms/CreatePostForm";

//wrap in auth state hook to dynamically render auth component
//example: authStat !== "user" ? <SignUp or SignIn /> : <Logout />
const CreatePost = () => {
  return <CreatePostForm  />;
};

export default CreatePost;
