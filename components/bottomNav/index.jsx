/* eslint-disable react/jsx-key */
import { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ChatIcon from "@material-ui/icons/Chat";
import PageviewIcon from "@material-ui/icons/Pageview";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { makeStyles } from "@material-ui/core/styles";

import Link from "./BotNavButton";
import CreatePostButton from "../buttons/CreatePostButton";
import { useRouter } from "next/router";
import theme from "../../styles/theme";
import CreatePostForm from "../forms/CreatePostForm";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "60%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BottomNav = ({ scroll, user, baseApiUrl }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // these states lifted from CreatePostForm
  const [stateFormValid, setStateFormValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  const router = useRouter();

  let paths = [
    "UsersBulletins",
    "CurrentChats",
    "SearchBulletins",
    "UserProfile",
  ];
  //tab routes left to right
  let tabs = ["Bulletins", "Chats", "Search", "Profile"];

  let icons = [
    <AssignmentIndIcon />,
    <ChatIcon />,
    <PageviewIcon />,
    <AccountBoxIcon />,
  ];

  //index in tabs arr
  const [activeTab, setActiveTab] = useState(null);
  useEffect(() => {
    let isNavRoute = paths.findIndex((path) => router.pathname.includes(path));
    isNavRoute == -1 ? setActiveTab(null) : setActiveTab(isNavRoute);
  }, [router.pathname]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  let tabButtons = tabs.map((tab, i) => (
    <Link href={`/${paths[i]}`} label={tab} value={i} icon={icons[i]} key={i} />
  ));

  return (
    // <C.Paper elevation={6}>
    <>
      <C.BottomNavigation
        value={activeTab}
        onChange={handleChange}
        component={C.Paper}
        elevation={scroll ? 10 : 2}
        style={{
          background: scroll ? "transparent" : theme.palette.primary.main,
        }}
      >
        {user && <CreatePostButton onClick={handleOpen} />}

        {tabButtons.slice(0, 2)}
        {user && <C.BottomNavigationAction />}
        {tabButtons.slice(2, 5)}
      </C.BottomNavigation>
      <C.Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <C.DialogTitle id="form-dialog-title">Post New Trade</C.DialogTitle>
        <C.DialogContent>
          <C.DialogContentText>
            Select Whether you are Offering or Seeking, then fill out the form
            and post your trade!
          </C.DialogContentText>
          {/* POST FORM COMPONENT PASSED LIFTED STATES */}
          <CreatePostForm
            handleClose={handleClose}
            user={user}
            baseApiUrl={baseApiUrl}
            loading={loading}
            setLoading={setLoading}
            stateFormValid={stateFormValid}
            setStateFormValid={setStateFormValid}
            setOpenToast={setOpenToast}
          />
        </C.DialogContent>
        <C.DialogActions>
          <C.Button onClick={handleClose} color="default">
            Cancel
          </C.Button>
          <C.Button
            type="submit"
            form="create-post-form"
            color="secondary"
            variant="contained"
            style={{ width: "auto" }}
            disabled={loading || !stateFormValid}
          >
            {!loading ? "Post" : "Loading..."}
          </C.Button>
        </C.DialogActions>
      </C.Dialog>
      <C.Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
      >
        <Alert onClose={handleCloseToast} severity="success">
          New Bulletin Posted
        </Alert>
      </C.Snackbar>
    </>
    // </C.Paper>
  );
};

export default BottomNav;
