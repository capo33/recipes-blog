import React from "react";
import { Alert } from "react-bootstrap";

type MessageProps = {
  variant?: string;
  children?: React.ReactNode;
};

const Message = ({ variant, children }: MessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
