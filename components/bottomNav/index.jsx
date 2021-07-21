import { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ChatIcon from "@material-ui/icons/Chat";
import PageviewIcon from "@material-ui/icons/Pageview";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Link from "./BotNavButton";

const BottomNav = () => {
  let paths = [
    "UsersBulletins",
    "CurrentChats",
    "SearchBulletins",
    "UserProfile",
  ];
  //tab routes left to right
  let tabs = [
    "Users Bulletins",
    "Current Chats",
    "Search Bulletins",
    "User Profile",
  ];

  let icons = [
    <AssignmentIndIcon />,
    <ChatIcon />,
    <PageviewIcon />,
    <AccountBoxIcon />,
  ];

  //index in tabs arr
  const [activeTab, setActiveTab] = useState(2);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  let tabButtons = tabs.map((tab, i) => (
    <Link href={paths[i]} label={tab} value={i} icon={icons[i]} />
  ));

  return (
    <C.BottomNavigation value={activeTab} onChange={handleChange}>
      {tabButtons}
    </C.BottomNavigation>
  );
};

export default BottomNav;
