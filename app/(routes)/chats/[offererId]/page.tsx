import prisma from "@/lib/prisma";
import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { findOrCreateConversation } from "@/lib/utils";

//this page shows the Conversation instance that the currently signed-in User has with the service Offerer
export default async function ChatWithOffererPage({
  params,
}: {
  params: Promise<{ offererId: string }>;
}) {
  //get the currently signed-in member
  const offererId = (await params).offererId;

  const session = await getSession();
  if (!session?.user) return null;

  //search for an existing Conversation between both Members
  const conversation = await findOrCreateConversation(
    currentMember.id,
    params.memberId //the Member that receives the Conversation iniciation
  );
  if (!conversation) return redirect(`/`); //automatically go to the general channel

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;
  //since we want to get the OTHER member, if the membeOne.id is the current profile.id, then the other member is memberTwo
  if (!otherMember) return redirect(`/}`);

  return (
    <div className="flex flex-col h-full relative">
      <MessageHeader
        type={"conversation"}
        serverId={params.serverId}
        memberToReceive={otherMember}
        imageUrl={otherMember.profile.imgUrl}
      />
      <div className="flex-1">
        <MessagesComponent
          type={"conversation"}
          name={otherMember.profile.name || ""}
          member={currentMember}
          chatId={conversation.id}
          apiUrl={"/api/messages"}
          socketUrl={"/api/socket/messages"}
          socketQuery={{
            conversationId: conversation.id,
            serverId: params.serverId,
          }}
          paramKey={"channelId"}
          paramValue={conversation.id}
        />
      </div>
      <ChatInput
        apiUrl={"/api/socket/messages"}
        query={{}}
        name={otherMember.profile.name || ""}
        type={"conversation"}
      />
    </div>
  );
}
