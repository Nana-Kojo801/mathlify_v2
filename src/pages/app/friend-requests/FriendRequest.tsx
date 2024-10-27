import HeaderCallback from "@/components/HeaderCallback";
import { api } from "@convex/_generated/api";
import { Id } from "@convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { FaCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FriendRequest = () => {
  const navigate = useNavigate();
  const requests = useQuery(api.friendRequest.getUserReceivedRequests) || []
  const acceptRequest = useMutation(api.friendRequest.acceptRequest)

  const acceptFriendRequest = async (requestId: Id<"friendRequests">, senderId: Id<"users">) => {
    await acceptRequest({ senderId, requestId })
  }

  return (
    <div className="fixed left-0 top-0 bg-white w-full h-full flex flex-col">
      <HeaderCallback
        title="Friend requests"
        callback={() => navigate("/app")}
      />
      <div className="overflow-y-auto flex flex-col mt-1 p-3">
            {requests.map(request => (
                <div className="flex items-center justify-between py-2 px-1 border-b border-b-gray-200">
				<p className="text-lg">
					<span className="font-bold">{request.sender.username}</span> sent a friend request
				</p>
				<button onClick={() => acceptFriendRequest(request._id, request.senderId)}>
					<FaCheck className="text-green-600 text-xl" />
				</button>
			</div>
            ))}
      </div>
    </div>
  );
};

export default FriendRequest;
