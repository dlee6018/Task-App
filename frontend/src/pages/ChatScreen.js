import React from "react";
import { Chat } from "../chat/Chat";
import "../chat/chat.scss";
import { useSelector } from "react-redux";

const ChatScreen = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  return (
    <div>
      <header>ChatApp</header>
      <Chat userInfo={userInfo} />
    </div>
  );
};

export default ChatScreen;
