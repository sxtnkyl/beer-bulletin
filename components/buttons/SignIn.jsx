import * as C from "@material-ui/core";
import Link from "next/link";

const SignIn = ({ innerText = "Sign In", hrefLink = "/Auth" }) => {
  return (
    <C.Button>
      <Link href={hrefLink}>{innerText}</Link>
    </C.Button>
  );
};

export default SignIn;
