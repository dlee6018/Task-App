import * as React from "react";

type MessageProps = {
  senderName: string,
  text: string
}

export const Message = ({ senderName, text } : MessageProps) => {
  return (
    <div className="message-item">
      <div>
        <b>{senderName}</b>
      </div>
      <span>{text}</span>
    </div>
  );
};
