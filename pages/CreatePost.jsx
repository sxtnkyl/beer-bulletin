import PageContainer from "../components/PageContainer";

//wrap in auth state hook to dynamically render auth component
//example: authStat !== "user" ? <SignUp or SignIn /> : <Logout />
const CreatePost = () => {
  return <PageContainer>im the create post page</PageContainer>;
};

export default CreatePost;
