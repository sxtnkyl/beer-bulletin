import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import UserInfoForm from "../../components/forms/UserSettingForm";
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
} from "../../middleware/utils";
import ScalableIcon from "../../components/ScalableIcon";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import UserProfileCard from "../../components/UserProfileCard";
import Cookies from "js-cookie";
import Router, { useRouter } from "next/router";

const useStyles = C.makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const UserProfile = (props) => {
  const { origin, referer, token, user, asPath } = props;
  const classes = useStyles();
  const router = useRouter();

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const onRefresh = () => {
    router.replace(router.asPath);
  };

  const logoutHandler = () => {
    Cookies.remove("token");
    Router.push({ pathname: "/", query: {} }, "/");
  };

  const welcomeHeader = user.data.username
    ? `Welcome, ${user.data.username}!`
    : "User Settings";

  return (
    <C.Container>
      <div className={classes.header}>
        <C.Typography variant="h2">{welcomeHeader}</C.Typography>
        <C.Button onClick={toggleEdit}>
          <ScalableIcon icon={faEdit} color={edit && "white"} />
        </C.Button>
      </div>
      {edit ? (
        <UserInfoForm {...props} edit={edit} toggleEdit={toggleEdit} onRefresh={onRefresh}/>
      ) : (
        <UserProfileCard {...props} />
      )}
      <C.Button
        color="secondary"
        variant="contained"
        style={{ width: "auto" }}
        onClick={logoutHandler}
      >
        Logout
      </C.Button>
    </C.Container>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const token = getAppCookies(req).token || "";
  const referer = req.headers.referer || "";

  //if no auth, redirect
  if (!token) {
    return {
      redirect: {
        destination: "/Auth?form=login",
        permanent: false,
      },
    };
  }

  const baseApiUrl = `${origin}/api`;

  const reqToken = token && verifyToken(token.replace("Bearer ", ""));

  //get user id from token- payload: id(userId)
  //api/users/[slug]
  const api = await fetch(`${baseApiUrl}/users/${reqToken.id}`, {
    headers: {
      authorization: token || "",
    },
  });

  const user = await api.json();

  return {
    props: {
      origin,
      referer,
      token,
      user,
      baseApiUrl,
    },
  };
}
