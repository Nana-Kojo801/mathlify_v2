import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";
import { FaEnvelope } from "react-icons/fa6";
import Friend from "../../_components/Friend";
import { Link } from "react-router-dom";

const Friends = () => {
  const friends = useQuery(api.user.getFriends)!;
  const requests = useQuery(api.friendRequest.getUserReceivedRequests)!;
  console.log("requests", requests);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <p className="text-purple-900 text-xl font-bold">Friends</p>
        <div className="flex items-center gap-7 text-purple-900">
          <Link className="text-4xl" to="/app/add-friend">
            +
          </Link>
          <Link className="relative" to="/app/friend-requests">
            {requests && requests.length > 0 && (
              <div className="absolute min-w-[20px] h-[20px] px-1 grid place-content-center bg-red-600 text-white rounded-full text-xs top-[-3px] left-[-10px]">
                {requests.length}
              </div>
            )}
            <FaEnvelope className="text-[27px]" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col">
        {friends &&
          friends.map((friend) => (
            <Friend key={friend!._id} friend={friend!} />
          ))}
      </div>
    </div>
  );
};

export default Friends;
