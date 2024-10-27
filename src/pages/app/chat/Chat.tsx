import { useAuth } from "@/hooks/useAuth";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { useEffect, useRef } from "react";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import TextArea from "react-textarea-autosize";

const Chat = () => {
  const params = useParams();
  const { user } = useAuth();
  const friendId = params.friendId as Id<"users">;
  const friend = useQuery(api.user.getUser, { id: friendId });
  const messages = useQuery(api.friendMessages.getCurrentUserChat, {
    friendId,
  });
  const sendMessage = useMutation(api.friendMessages.sendMessage);
  const updateUser = useMutation(api.user.updateUser)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendFriendMessage = async () => {
    await sendMessage({
      receiverId: friendId,
      message: textAreaRef.current!.value,
    });
    textAreaRef.current!.value = "";
  };

  useEffect(() => {
    const clearUnread = async () => {
      const unreadMessages = user!.unreadMessages
      const index = unreadMessages.findIndex(msg => msg.userId === friendId)
      if(index === -1) return
      unreadMessages[index].count = 0
      await updateUser({ unreadMessages })
    }
    clearUnread()
  }, [friendId, messages, updateUser, user])

  return (
    <div className="fixed left-0 top-0 w-full h-full overflow-y-auto flex flex-col bg-white">
      <header className="p-3 flex items-center gap-3 border-b border-b-gray-300">
        <Link to="/app" className="flex items-center gap-3">
          <FaArrowLeft className="text-xl text-purple-900" />
          <div className="flex items-center gap-1">
            <img
              className="w-[35px] aspect-square rounded-full object-cover"
              src={friend?.avatar}
              alt="Friend pic"
            />
            <p className="text-lg font-bold">{friend?.username}</p>
          </div>
        </Link>
      </header>
      <main className="flex-grow flex flex-col overflow-y-auto p-3 gap-3">
        {messages &&
          messages.map((message) => {
            const side = message.senderId === user!._id ? "right" : "left";
            return (
              <div
                key={message._id}
                className={`max-w-[70%] flex flex-col ${
                  side == "left" ? "self-start" : "self-end"
                }`}
              >
                <div className="p-2 px-3 rounded-[20px] bg-purple-900 text-white w-fit max-w-2/4 ">
                  <p>{message.message}</p>
                </div>
              </div>
            );
          })}
      </main>
      <footer className="p-3 pt-0 flex gap-1">
        <TextArea
          ref={textAreaRef}
          placeholder="Enter your message here..."
          className="w-full h-[50px] p-3 bg-gray-100 border border-gray-300 rounded-3xl outline-2 outline-purple-900"
        />
        <button
          onClick={sendFriendMessage}
          className="w-[50px] aspect-square self-start mt-1 bg-purple-900 text-white grid place-content-center rounded-full"
        >
          <FaPaperPlane className="text-xl" />
        </button>
      </footer>
    </div>
  );
};

export default Chat;
