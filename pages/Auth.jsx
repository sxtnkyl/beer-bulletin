import PageContainer from "../components/PageContainer";

//wrap in auth state hook to dynamically render auth component
//example: authStat !== "user" ? <SignUp or SignIn /> : <Logout />
const Auth = () => {
  return <PageContainer>im the auth page</PageContainer>;
};

export default Auth;
