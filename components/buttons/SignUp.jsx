import * as S from "@material-ui/core";
import Link from "next/link";

const SignUp = ({ innerText, hrefLink = "" }) => {
  return (
    <S.Button>
      <Link href={hrefLink}>{innerText}</Link>
    </S.Button>
  );
};

export default SignUp;
