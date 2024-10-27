import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/stores/gameStore";
import { getDifficultyByRound } from "@/utils/utils";
import { FaPlay } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";

const Marathon = () => {
  const { user } = useAuth();
  const initGame = useGame((state) => state.init);
  const navigate = useNavigate();

  const startGame = () => {
    initGame(getDifficultyByRound(1));
    navigate("play");
  };

  return (
    <div className="w-full h-full overflow-y-auto p-3 py-2 flex flex-col gap-5 relative">
      <div className="mt-2 flex flex-col gap-1">
        <h2 className="font-bold text-2xl text-purple-900">Stats</h2>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(user!.marathonData).map(([heading, value]) => (
            <div
              key={heading}
              className="border border-purple-900 p-3 rounded-lg"
            >
              <h4 className="text-purple-900 font-bold text-lg capitalize">
                {heading}
              </h4>
              <h2 className="font-bold text-xl">{value}</h2>
            </div>
          ))}
          <button
            onClick={startGame}
            className="col-span-2 mt-2 p-[10px] bg-purple-900 text-[15px] text-white rounded-md flex items-center justify-center gap-2"
          >
            <FaPlay className="text-lg" />
            Play marathon
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <h2 className="font-bold text-2xl text-purple-900">Online events</h2>
        <p>No events yet</p>
      </div>
      <Outlet />
    </div>
  );
};

export default Marathon;
