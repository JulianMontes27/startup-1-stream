import getSession from "@/lib/get-session";
import { redirect } from "next/navigation";
import { findOrCreateConversation } from "@/lib/utils";
import ChatHeader from "@/components/chats/chat-header";
import MessagesComponent from "@/components/chats/chat-messages";
import ChatInput from "@/components/chats/chat-input";

//this page shows the Conversation instance that the currently signed-in User has with the service Offerer
export default async function ChatWithOffererPage({
  params,
}: {
  params: Promise<{ offererId: string }>;
}) {
  //get the currently signed-in member
  const offererId = (await params).offererId;

  const session = await getSession();
  const user = session?.user;
  if (!user?.id) return redirect("/");

  //search for an existing Conversation between both Users
  //Conversation stores the Direct Messages between the Users
  const conversation = await findOrCreateConversation(
    user.id,
    offererId //the Offerer that receives the Conversation iniciation
  );
  if (!conversation) return redirect(`/`); //automatically go to the general channel

  const { seeker, offerer } = conversation;

  const otherUser = seeker.id === user.id ? offerer : seeker;
  //since we want to get the OTHER user, if the seeker.id is the current user.id, then the other user is the offerer
  if (!otherUser.image) return redirect(`/}`);

  return (
    <div className="flex flex-col h-full sm:p-3">
      <ChatHeader userToReceiveMessage={otherUser} imageUrl={otherUser.image} />
      <div className="flex-1">
        <MessagesComponent
          name={otherUser.name || ""}
          member={seeker}
          chatId={conversation.id}
          apiUrl={"/api/messages"}
          socketUrl={"/api/socket/messages"}
        />
      </div>
      <ChatInput
        apiUrl={"/api/socket/chat/message"}
        name={otherUser.name || ""}
        query={{
          userToSendToId: otherUser.id,
        }}
      />
    </div>
  );
}
