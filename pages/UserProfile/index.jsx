import PageContainer from "../../components/PageContainer";

//wrap in auth state hook to dynamically render auth component
//example: authStat !== "user" ? <SignUp or SignIn /> : <Logout />
const UserProfile = () => {
  return <PageContainer>im the user's profile</PageContainer>;
};

export default UserProfile;
