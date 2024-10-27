import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/types";
import { useMemo } from "react";
import { FaEnvelope } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Friend = ({ friend }: { friend: User }) => {
  const { user } = useAuth();
  const unreadMessages = useMemo(
    () => user!.unreadMessages.find((msg) => msg.userId === friend._id)?.count || 0,
    [user, friend]
  );
  return (
    <div className="flex items-center justify-between py-3 border-b border-b-gray-300">
      <div className="flex items-center gap-1">
        <img
          src={friend.avatar}
          className="w-[32px] aspect-square rounded-full object-cover"
        ></img>
        <p>
          {friend.username}({friend.elo})
        </p>
      </div>
      <div className="flex items-center gap-1">
        {unreadMessages > 0 && (
          <div className="min-w-[22px] h-[22px] px-1 rounded-3xl bg-red-600 text-white grid place-content-center text-xs">
            {unreadMessages}
          </div>
        )}

        <Link
          to={`/app/chat/${friend._id}`}
          className="flex items-center gap-6 relative"
        >
          <FaEnvelope className="text-[25px] text-purple-900" />
        </Link>
      </div>
    </div>
  );
};

export default Friend;
