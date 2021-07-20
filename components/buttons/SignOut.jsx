import * as C from "@material-ui/core";
import Link from "next/link";

const SignOut = ({ innerText = "Sign Out", hrefLink = "/Landing" }) => {
  return (
    <C.Button>
      <Link href={hrefLink}>{innerText}</Link>
    </C.Button>
  );
};

export default SignOut;
