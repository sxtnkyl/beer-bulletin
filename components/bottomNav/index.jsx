import { useState, useEffect } from "react";
import * as C from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ChatIcon from "@material-ui/icons/Chat";
import PageviewIcon from "@material-ui/icons/Pageview";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import Link from "./BotNavButton";
import CreatePostButton from "../buttons/CreatePostButton";
import { useSession } from "next-auth/client";

const BottomNav = () => {
  const [session, loading] = useSession();

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
  const [activeTab, setActiveTab] = useState(2);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  let tabButtons = tabs.map((tab, i) => (
    <Link href={`/${paths[i]}`} label={tab} value={i} icon={icons[i]} key={i} />
  ));

  return (
    <C.BottomNavigation
      value={activeTab}
      onChange={handleChange}
      component="nav"
    >
      {session && <CreatePostButton />}
      {tabButtons}
    </C.BottomNavigation>
  );
};

export default BottomNav;
