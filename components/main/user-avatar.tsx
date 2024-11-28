import React from "react";

import { Avatar } from "@/components/ui/avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

interface UserAvatarProps {
  imageUrl?: string;
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ imageUrl, className }) => {
  return (
    <div>
      <Avatar className={cn("h-7 w-7 md:h-10 md:w-10 ", className)}>
        <AvatarImage src={imageUrl} alt={imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default UserAvatar;
