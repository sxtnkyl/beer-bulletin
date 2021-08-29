import { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ChatIcon from "@material-ui/icons/Chat";
import PageviewIcon from "@material-ui/icons/Pageview";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Link from "./BotNavButton";
import CreatePostButton from "../buttons/CreatePostButton";
import { useRouter } from "next/router";
import theme from "../../styles/theme";

const BottomNav = ({ scroll }) => {
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
    <C.BottomNavigation
      value={activeTab}
      onChange={handleChange}
      component={C.Paper}
      elevation={scroll ? 10 : 2}
      style={{
        background: scroll ? "transparent" : theme.palette.primary.main,
      }}
    >
      {/* <CreatePostButton /> */}
      {tabButtons}
    </C.BottomNavigation>
    // </C.Paper>
  );
};

export default BottomNav;
