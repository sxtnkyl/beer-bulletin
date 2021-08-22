import React, { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import UserInfoForm from "../../components/forms/UserSettingForm";
import { absoluteUrl, getAppCookies } from "../../middleware/utils";
import ScalableIcon from "../../components/ScalableIcon";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import UserProfileCard from "../../components/UserProfileCard";

const useStyles = C.makeStyles(() => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

const UserProfile = (props) => {
  const { origin, referer, token, user } = props;
  const classes = useStyles();

  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
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
        <UserInfoForm {...props} edit={edit} toggleEdit={toggleEdit} />
      ) : (
        <UserProfileCard {...props} />
      )}
    </C.Container>
  );
};

export default UserProfile;

export async function getServerSideProps(context) {
  const { query, req } = context;
  const { origin } = absoluteUrl(req);

  const token = getAppCookies(req).token || "";
  const referer = req.headers.referer || "";

  //if no auth, redirect
  // if (!token) {
  //   return {
  //     redirect: {
  //       destination: "/Auth?form=login",
  //       permanent: false,
  //     },
  //   };
  // }

  const baseApiUrl = `${origin}/api`;

  //get user id from token- payload: id(userId)
  //api/users/[slug]
  // const api = await fetch(`${baseApiUrl}/users/${token.id}`, {
  //   headers: {
  //     authorization: token || "",
  //   },
  // });

  // const user = await api.json();

  const sample = {
    status: "success",
    data: {
      id: 1,
      username: "Sal",
      email: "sal@hotmail.com",
      first_name: "Sal",
      last_name: "Huddin",
      num_trades: 1,
      pref_dark: false,
      profile_pic:
        "https://beerbulletinspace.nyc3.digitaloceanspaces.com/71.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKANBEZNAIRZRF5YRQPA%2F20210810%2Fnyc3%2Fs3%2Faws4_request&X-Amz-Date=20210810T004836Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=7b17199defdcb50c54512c9b43696e8084480e87f0eec26482559cd3a4930d92",
    },
  };

  const user = sample;

  return {
    props: {
      origin,
      referer,
      token,
      user,
    },
  };
}
