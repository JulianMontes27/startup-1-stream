import { User } from "@prisma/client";

// import SocketIndicator from "./socket-indicator";

interface ChatHeaderProps {
  userToReceiveMessage: User;
  imageUrl?: string;
}

import { cn } from "@/lib/utils";
import UserAvatar from "../main/user-avatar";

const ChatHeader: React.FC<ChatHeaderProps> = ({
  imageUrl,
  userToReceiveMessage,
}) => {
  return (
    <div
      className={cn(
        "w-full text-xl font-semibold flex items-center "
      )}
    >
      <div className="flex flex-row gap-2">
        <div className="flex flex-row items-center h-full">
          {userToReceiveMessage && (
            <h1 className="flex flex-row gap-4 items-center">
              <div className="flex flex-row items-center gap-2">
                <UserAvatar imageUrl={imageUrl} />
                <p>{userToReceiveMessage.name}</p>
              </div>
            </h1>
          )}
        </div>
        {/* <SocketIndicator /> */}
      </div>
    </div>
  );
};

export default ChatHeader;
