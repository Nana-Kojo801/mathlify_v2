import HeaderCallback from "@/components/HeaderCallback";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { FaMagnifyingGlass, FaPaperPlane } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Id } from "@convex/_generated/dataModel";

const AddFriend = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const requests = useQuery(api.friendRequest.getAllUserRequests) || [];
  const users = useQuery(api.user.searchUser, { username: search });
  const createRequest = useMutation(api.friendRequest.create);

  const sendRequest = async (receiverId: Id<"users">) => {
    await createRequest({ receiverId });
  };

  return (
    <div className="fixed left-0 top-0 bg-white w-full h-full flex flex-col">
      <HeaderCallback title="Add Friend" callback={() => navigate("/app")} />
      <div className="p-3 flex flex-col">
        <div className="relative">
          <FaMagnifyingGlass className="absolute right-3 top-2/4 translate-y-[-50%] text-lg text-purple-900" />
          <input
            type="text"
            placeholder="Search for friend by username"
            className="w-full py-[10px] indent-4 rounded-md bg-gray-100 outline-2 outline-purple-900"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-y-auto flex flex-col mt-3">
          {users?.map((friend) => {
            const isFriend = user!.friends.includes(friend._id);
            const receivedRequest = requests.some(
              (req) => req.receiverId === user!._id
            );
            const sentRequest = requests.some(
              (req) => req.receiverId === friend._id
            );
            return (
              <div
                key={friend._id}
                className="flex items-center justify-between py-3 border-b border-b-gray-300"
              >
                <div className="flex items-center gap-1">
                  <img
                    src={friend.avatar}
                    className="w-[32px] aspect-square rounded-full object-cover"
                  ></img>
                  <p>
                    {friend.username}({friend.elo})
                  </p>
                </div>
                {isFriend ? (
                  <p className="w-[65px] text-center text-[14px] font-bold bg-purple-900 rounded-[5px] text-white px-2 py-1">
                    Friend
                  </p>
                ) : sentRequest ? (
                  <div className="flex items-center gap-2 text-red-600">
                    <FaPaperPlane />
                    <p className="text-sm">Request sent</p>
                  </div>
                ) : receivedRequest ? (
                  <div className="flex items-center gap-2 text-yellow-600">
                    <FaPaperPlane />
                    <p className="text-sm">Received request</p>
                  </div>
                ) : (
                  <button
                    onClick={() => sendRequest(friend._id)}
                    className="flex items-center gap-2 text-green-600"
                  >
                    <FaPaperPlane />
                    <p className="text-sm">Send request</p>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddFriend;
