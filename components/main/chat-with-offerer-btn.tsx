"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ChatWithOffererBtnProps {
  offererId: string;
  disabled: boolean;
}

const ChatWithOffererBtn: React.FC<ChatWithOffererBtnProps> = ({
  offererId,
  disabled,
}) => {
  const router = useRouter();
  return (
    <Button
      className="w-full "
      disabled={disabled}
      onClick={() => router.push(`/chats/${offererId}`)}
    >
      Chat with service offerer
    </Button>
  );
};

export default ChatWithOffererBtn;
