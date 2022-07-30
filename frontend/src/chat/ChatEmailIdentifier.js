import React from "react";
import { useSelector } from "react-redux";

export const ChatEmailIdentifier = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  return <div>{userInfo.email}</div>;
};
