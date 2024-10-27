import Game from "@/components/Game";
import { useGame } from "@/stores/gameStore";
import { FaPowerOff, FaRotateRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ResultButtons = () => {
  const retry = useGame((state) => state.retry);
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <button
        onClick={retry}
        className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-green-800 text-white"
      >
        <FaRotateRight /> Play again
      </button>
      <button
        onClick={() => navigate("/app/practice", { replace: true })}
        className="p-3 rounded-md grid place-content-center grid-flow-col items-center gap-2 bg-red-800 text-white"
      >
        <FaPowerOff /> Quit
      </button>
    </div>
  );
};

const PlayPractice = () => {
  return (
    <Game
      callBackUrl="/app/practice"
      Correct={ResultButtons}
      Wrong={ResultButtons}
      Timeout={ResultButtons}
    />
  );
};

export default PlayPractice;
