import Game from "@/components/Game";
import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/stores/gameStore";
import { getDifficultyByLevel } from "@/utils/utils";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import {
  FaForward,
  FaLayerGroup,
  FaPowerOff,
  FaRotateRight,
} from "react-icons/fa6";
import { useNavigate, useOutletContext } from "react-router-dom";

const CorrectButtons = ({
  levelCompleted,
  nextLevel,
}: {
  levelCompleted: boolean;
  nextLevel: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={nextLevel}
          className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-green-800 text-white"
        >
          <FaForward /> Next Level
        </button>
        <button
          onClick={() => navigate("/app/levels", { replace: true })}
          className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-red-800 text-white"
        >
          <FaPowerOff /> Quit
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {levelCompleted && (
          <p className="text-2xl text-purple-900 font-bold">+5 Chips</p>
        )}
      </div>
    </div>
  );
};
const WrongButtons = () => {
  const navigate = useNavigate();
  const retry = useGame((state) => state.retry);
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <button
        onClick={retry}
        className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-green-800 text-white"
      >
        <FaRotateRight /> Retry
      </button>
      <button
        onClick={() => navigate("/app/levels", { replace: true })}
        className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-red-800 text-white"
      >
        <FaPowerOff /> Quit
      </button>
    </div>
  );
};

const LevelDisplay = ({ currentLevel }: { currentLevel: number }) => {
  return (
    <div className="absolute left-3 top-8 flex gap-2 items-center justify-center text-white text-xl bg-purple-900 py-1 px-3 rounded-md">
      <FaLayerGroup />
      <p>{currentLevel}</p>
    </div>
  );
};

const PlayLevels = () => {
  const { initialLevel } = useOutletContext<{ initialLevel: number }>();
  const { user } = useAuth();
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const answerState = useGame((state) => state.answerState);
  const gameState = useGame((state) => state.gameState);
  const initGame = useGame((state) => state.init);
  const completeLevel = useMutation(api.user.completeLevel);

  const correct = useCallback(async () => {
    if (!user?.completedLevels.includes(currentLevel)) {
      setLevelCompleted(true);
      completeLevel({ chips: 5, level: currentLevel });
    }
  }, [completeLevel, currentLevel, user]);

  const nextLevel = () => {
    const newLevel = currentLevel + 1
    setCurrentLevel(newLevel);
    initGame(getDifficultyByLevel(newLevel));
  };

  useEffect(() => {
    if (answerState === null) return;
    if (answerState === "correct") correct();
  }, [answerState, correct]);
  return (
    <>
      <Game
        callBackUrl="/app/levels"
        Correct={() => CorrectButtons({ levelCompleted, nextLevel })}
        Wrong={WrongButtons}
        Timeout={WrongButtons}
      >
        {gameState !== "ability" && !answerState && (
          <LevelDisplay currentLevel={currentLevel} />
        )}
      </Game>
    </>
  );
};

export default PlayLevels;
