import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/stores/gameStore";
import { Difficulty } from "@/types/types";
import { levels } from "@/utils/utils";
import { useState } from "react";
import { FaLock } from "react-icons/fa6";
import { Outlet, useNavigate } from "react-router-dom";

const Levels = () => {
  const { user } = useAuth();
  const [initialLevel, setInitialLevel] = useState(0);
  const initGame = useGame(state => state.init)
  const navigate = useNavigate()

  const startGame = ({ level, ...difficilty}: Difficulty & { level: number }) => {
    setInitialLevel(level)
    initGame(difficilty)
    navigate("play")
  }

  return (
    <div className="w-full h-full p-3 grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] gap-2">
      {levels.map((level, index) => {
        const completed = user?.completedLevels.includes(level.level) as boolean;
        const unlocked = user?.completedLevels.includes(index) || level.level === 1
        return (
          <button
            key={level.level}
            disabled={!unlocked}
            onClick={() => startGame(level)}
            className={`aspect-square border rounded-md text-white text-xl font-bold ${
              completed ? "bg-purple-900" : "bg-gray-600"
            } grid place-content-center`}
          >
            {unlocked ? `${level.level}` : <FaLock />}
          </button>
        );
      })}
      <Outlet context={{ initialLevel }} />
    </div>
  );
};

export default Levels;
