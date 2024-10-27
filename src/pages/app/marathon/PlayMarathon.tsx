import Game from "@/components/Game";
import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/stores/gameStore";
import { getDifficultyByRound } from "@/utils/utils";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useState } from "react";
import {
  FaForward,
  FaLayerGroup,
  FaPowerOff,
  FaRotateRight,
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CorrectButtons = ({ nextRound }: { nextRound: () => void }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-2 mt-2">
        <button
          onClick={nextRound}
          className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-green-800 text-white"
        >
          <FaForward /> Next Round
        </button>
        <button
          onClick={() => navigate("/app/levels", { replace: true })}
          className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-red-800 text-white"
        >
          <FaPowerOff /> Quit
        </button>
      </div>
    </div>
  );
};
const WrongButtons = ({ startAgain }: { startAgain: () => void }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <button
        onClick={startAgain}
        className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-green-800 text-white"
      >
        <FaRotateRight /> Start again
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

const RoundDisplay = ({ currentRound }: { currentRound: number }) => {
  return (
    <div className="absolute left-3 top-8 flex gap-2 items-center justify-center text-white text-xl bg-purple-900 py-1 px-3 rounded-md">
      <FaLayerGroup />
      <p>{currentRound}</p>
    </div>
  );
};

const PlayMarathon = () => {
    const { user } = useAuth()
  const [currentRound, setCurrentRound] = useState(1);
  const initGame = useGame((state) => state.init);
  const answerState = useGame((state) => state.answerState);
  const gameState = useGame((state) => state.gameState);
  const updateUser = useMutation(api.user.updateUser)

  const nextRound = () => {
    const newRound = currentRound + 1;
    setCurrentRound(newRound);
    initGame(getDifficultyByRound(newRound));
  };

  const startAgain = () => {
    setCurrentRound(1)
    initGame(getDifficultyByRound(1))
  }

  const correct = useCallback(async () => {
    console.log('correct');
    
    await updateUser({
        marathonData: {
            ...user!.marathonData,
            playCount: user!.marathonData.playCount+1,
            totalCorrects: user!.marathonData.totalCorrects + 1,
            highestRound: Math.max(user!.marathonData.highestRound, currentRound)
        }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, updateUser])

  const wrong = useCallback(async () => {
    await updateUser({
        marathonData: {
            ...user!.marathonData,
            playCount: user!.marathonData.playCount+1,
            totalWrongs: user!.marathonData.totalWrongs + 1,
            highestRound: Math.max(user!.marathonData.highestRound, currentRound)
        }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentRound, updateUser])

  useEffect(() => {
    if(answerState === null) return
    if(answerState === "correct") correct()
    else wrong()
  }, [answerState, correct, wrong])

  return (
    <Game
      callBackUrl="/app/marathon"
      Correct={() => CorrectButtons({ nextRound })}
      Wrong={() => WrongButtons({ startAgain })}
      Timeout={() => WrongButtons({ startAgain })}
    >
        {gameState !== "ability" && !answerState && (
          <RoundDisplay currentRound={currentRound} />
        )}
    </Game>
  );
};

export default PlayMarathon;
