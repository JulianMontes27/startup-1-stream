"use client";

import React from "react";

interface ChatInputProps {
  apiUrl: string;
  query: {
    userToSendToId: string;
  };
  name: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ apiUrl, query, name }) => {
  return <div>ChatInput</div>;
};

export default ChatInput;
