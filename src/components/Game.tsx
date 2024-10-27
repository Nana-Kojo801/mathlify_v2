import { useAuth } from "@/hooks/useAuth";
import { useGame } from "@/stores/gameStore";
import React, { useEffect, useState } from "react";
import {
  FaCheck,
  FaClock,
  FaDeleteLeft,
  FaPlay,
  FaPowerOff,
  FaStar,
  FaX,
} from "react-icons/fa6";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router-dom";
import HeaderCallback from "./HeaderCallback";
import { useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

const stages = ["3", "2", "1", "GO!!!"];
const keyNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const Timer = () => {
  const timer = useGame((state) => state.difficulty?.timer)!;
  const [currentTimer, setCurrentTimer] = useState(timer);
  const setAnswerState = useGame((state) => state.setAnswerState);
  const submitted = useGame((state) => state.submitted);
  const setSubmitted = useGame((state) => state.setSubmitted);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTimer <= 0 && !submitted) {
        setAnswerState("timeout");
        setSubmitted(true);
      }
      if (submitted) return;
      setCurrentTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentTimer, setCurrentTimer, submitted, setAnswerState, setSubmitted]);

  return (
    <div className="absolute w-[80px] right-0 top-5 flex gap-1 items-center justify-center text-white text-xl bg-green-600 py-1 px-2 rounded-md">
      <FaClock />
      <p>{currentTimer}s</p>
    </div>
  );
};

const KeyPad = ({
  onNumberClicked,
  onMinusClicked,
  onBackspaceClicked,
  onEnterClicked,
}: {
  onNumberClicked: (number: string) => void;
  onMinusClicked: () => void;
  onBackspaceClicked: () => void;
  onEnterClicked: () => void;
}) => {
  const answerState = useGame((state) => state.answerState);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (answerState !== null) return;
      if (e.key === "Backspace") return onBackspaceClicked();
      if (e.key === "-") return onMinusClicked();
      if (e.key === "Enter") return onEnterClicked();
      if (keyNumbers.includes(e.key)) return onNumberClicked(e.key);
    };

    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [
    answerState,
    onBackspaceClicked,
    onMinusClicked,
    onNumberClicked,
    onEnterClicked,
  ]);
  return (
    <div className="w-full grid grid-cols-3 gap-1">
      {keyNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onNumberClicked(number)}
          className="text-2xl text-purple-900 font-bold border-2 border-purple-900 p-2 rounded-md"
        >
          {number}
        </button>
      ))}
      <button
        onClick={onMinusClicked}
        id="minus_button"
        className="text-lg font-bold border-2 border-purple-900 grid place-content-center p-2 rounded-md"
      >
        <div className="w-[25px] h-[3px] bg-purple-900"></div>
      </button>
      <button
        onClick={onBackspaceClicked}
        id="backspace_button"
        className="text-2xl font-bold border-2 border-purple-900 grid place-content-center p-2 rounded-md"
      >
        <FaDeleteLeft className="text-purple-900" />
      </button>
      <button
        onClick={onEnterClicked}
        className="col-span-3 text-xl text-white bg-purple-900 font-bold border-2 border-purple-900 p-2 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

const Answer = ({ onSubmit }: { onSubmit: (answer: number) => void }) => {
  const [answer, setAnswer] = useState("");
  const setSubmitted = useGame((state) => state.setSubmitted);
  const abilities = useGame((state) => state.abilities);
  const correctAnswer = useGame((state) => state.correctAnswer);

  const handleBackspaceClicked = () => {
    if (!answer.length) return;
    setAnswer((prevAnswer) => prevAnswer.slice(0, -1));
  };
  const handleEnterClicked = () => {
    if (!answer.length) return;
    setSubmitted(true);
    onSubmit(parseInt(answer));
  };
  const handleMinusClicked = () => {
    if (answer.length) return;
    setAnswer((prevAnswer) => prevAnswer.concat("-"));
  };
  const handleNumberClicked = (number: string) =>
    setAnswer((prevAnswer) => {
      return prevAnswer.concat(number);
    });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative flex-grow flex justify-center items-center">
        <Timer />
        <div>
          <p
            className={`text-3xl font-bold mt-10 ${
              !answer.length
                ? "text-2xl text-gray-400"
                : abilities.includes("auto answer")
                  ? answer === String(correctAnswer)
                    ? "text-green-600"
                    : "text-red-600"
                  : "text-purple-900"
            }`}
          >
            {!answer.length
              ? `Type your answer ${abilities.includes("revealation") ? `(${correctAnswer})` : ""}`
              : answer}
          </p>
        </div>
      </div>
      <KeyPad
        onBackspaceClicked={handleBackspaceClicked}
        onEnterClicked={handleEnterClicked}
        onMinusClicked={handleMinusClicked}
        onNumberClicked={handleNumberClicked}
      />
    </div>
  );
};

const Questioning = ({ onDone }: { onDone: () => void }) => {
  const numbers = useGame((state) => state.numbers);
  const timeInterval = useGame((state) => state.difficulty?.interval)!;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex >= numbers.length - 1) return onDone();
      setCurrentIndex((prevIndex) => (prevIndex += 1));
    }, timeInterval * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeInterval, currentIndex, setCurrentIndex, numbers.length, onDone]);

  return (
    <div className="w-full h-full grid place-content-center">
      <p className="text-purple-900 text-5xl font-bold">
        {numbers[currentIndex]}
      </p>
    </div>
  );
};

const CountDown = ({ onDone }: { onDone: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex >= stages.length - 1) return onDone();
      setCurrentIndex((prevIndex) => (prevIndex += 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, setCurrentIndex, onDone]);

  return (
    <div className="w-full h-full grid place-content-center">
      <p className="text-4xl font-bold text-purple-900">
        {stages[currentIndex]}
      </p>
    </div>
  );
};

const Ability = ({ onQuit }: { onQuit: () => void }) => {
  const { user } = useAuth();
  const addAbility = useGame((state) => state.addAbility);
  const abilities = useGame((state) => state.abilities);
  const setGameState = useGame((state) => state.setGameState);
  return (
    <div className="flex-grow flex flex-col">
      <h2 className="text-xl font-bold">Choose abilities to use</h2>
      <div className="flex-grow flex flex-col gap-2 mt-1">
        {user?.abilities.map(({ name }) => {
          const selected = abilities.includes(name.toLocaleLowerCase());
          return (
            <button
              key={name}
              onClick={() => addAbility(name.toLocaleLowerCase())}
              className={`p-2 border border-purple-900 ${
                selected ? "text-white bg-purple-900" : "text-purple-900"
              } rounded-md text-left`}
            >
              {name}
            </button>
          );
        })}
        {!user?.abilities.length && <p>No abilities</p>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setGameState("countdown")}
          className="p-[10px] bg-green-800 text-white rounded-md flex justify-center items-center gap-2"
        >
          <FaPlay className="text-lg" /> Start
        </button>
        <button
          onClick={onQuit}
          className="p-[10px] bg-red-800 text-white rounded-md flex justify-center items-center gap-2"
        >
          <FaPowerOff className="text-lg" /> Quit
        </button>
      </div>
    </div>
  );
};

const ResultModal = ({
  children,
  type,
}: {
  children: React.ReactNode;
  type: "correct" | "wrong" | "timeout";
}) => {
  const setShowReview = useGame((state) => state.setShowReview);
  const color =
    type === "correct"
      ? "bg-green-600"
      : type === "wrong"
        ? "bg-red-600"
        : "bg-yellow-600";
  return (
    <Backdrop>
      <div className="w-full h-full bg-white flex flex-col overflow-hidden">
        <div className={`${color} relative h-[15%] flex justify-center`}>
          <div className="absolute bottom-[-50px] w-[100px] aspect-square rounded-full bg-white border-2 grid place-content-center">
            {type === "correct" && (
              <FaCheck className="text-5xl text-green-600" />
            )}
            {type === "wrong" && <FaX className="text-5xl text-red-600" />}
            {type === "timeout" && (
              <FaClock className="text-5xl text-yellow-600" />
            )}
          </div>
        </div>
        <div className="mt-[150px] flex flex-col items-center flex-grow">
          {type === "correct" && (
            <p className="text-3xl text-green-600 font-bold">YOU ARE RIGHT</p>
          )}
          {type === "wrong" && (
            <p className="text-3xl text-red-600 font-bold">YOU ARE WRONG</p>
          )}
          {type === "timeout" && (
            <p className="text-3xl text-yellow-600 font-bold">TIME IS UP</p>
          )}
          <div className="flex flex-col w-full max-w-[500px] px-4 mt-10 gap-2">
            <button
              onClick={() => setShowReview(true)}
              className="p-3 bg-blue-900 text-white rounded-md grid place-content-center grid-flow-col items-center gap-2"
            >
              <FaStar /> Review
            </button>
            {children}
          </div>
        </div>
        <div className={`h-[30px] ${color}`}></div>
      </div>
    </Backdrop>
  );
};

const Review = () => {
  const numbers = useGame((state) => state.numbers);
  const setShowReview = useGame((state) => state.setShowReview);
  const [selectedIndex, setSelectedIndex] = useState(numbers.length - 1);

  return (
    <div className="fixed z-20 left-0 top-0 p-3 w-full h-full flex flex-col bg-white">
      <HeaderCallback title="Review" callback={() => setShowReview(false)} />
      <div className="flex-grow grid grid-rows-2 mt-2">
        <div className="flex flex-col border-b border-b-gray-400 gap-1">
          <h2 className="text-lg font-bold">Numbers</h2>
          <div className="grid grid-cols-[repeat(auto-fill,_minmax(40px,_1fr))] gap-2">
            {numbers.map((number, i) => {
              const selected = selectedIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`border border-purple-900 text-lg ${
                    selected
                      ? "bg-purple-900 text-white"
                      : "bg-white text-purple-900"
                  } aspect-square rounded-md`}
                >
                  {number}
                </button>
              );
            })}
          </div>
        </div>
        <div className="class=flex flex-col border-b border-b-gray-400">
          <h2 className="text-xl font-bold mt-1">Answer</h2>
          <p className="text-lg">
            {numbers.slice(0, selectedIndex + 1).reduce((a, b) => a + b, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

const ForeSight = ({ onDone }: { onDone: () => void }) => {
  const numbers = useGame((state) => state.numbers);
  const interval = useGame((state) => state.difficulty?.interval)!;

  useEffect(() => {
    const timeout = setTimeout(onDone, interval * numbers.length * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [interval, onDone, numbers]);

  return (
    <div className="w-full h-full flex justify-center items-center p-3">
      <div className="w-full place-content-center place-items-center grid grid-cols-[repeat(auto-fit,_minmax(50px,_1fr))] gap-8">
        {numbers.map((number, i) => (
          <p key={i} className="text-3xl text-purple-900 font-bold">
            {number}
          </p>
        ))}
      </div>
    </div>
  );
};

const Game = ({
  children,
  Correct,
  Wrong,
  Timeout,
  callBackUrl,
}: {
  children?: React.ReactNode;
  Correct: () => JSX.Element;
  Wrong: () => JSX.Element;
  Timeout: () => JSX.Element;
  callBackUrl: string;
}) => {
  const { user } = useAuth();
  const gameState = useGame((state) => state.gameState);
  const answerState = useGame((state) => state.answerState);
  const setGameState = useGame((state) => state.setGameState);
  const setAnswerState = useGame((state) => state.setAnswerState);
  const correctAnswer = useGame((state) => state.correctAnswer);
  const resetGame = useGame((state) => state.retry);
  const showReview = useGame((state) => state.showReview);
  const difficulty = useGame((state) => state.difficulty);
  const abilities = useGame((state) => state.abilities);
  const updateUser = useMutation(api.user.updateUser);
  const navigate = useNavigate();

  const handleSubmit = async (answer: number) => {
    if (answer === correctAnswer) {
      setAnswerState("correct");
    } else {
      setAnswerState("wrong");
    }
  };

  useEffect(() => {
    if (difficulty === null) navigate(callBackUrl);
  }, [difficulty, navigate, callBackUrl]);

  useEffect(() => {
    return () => {
      resetGame();
    };
  }, [resetGame]);

  useEffect(() => {
    if (answerState === null) return;
    const reduceAbilityQuantity = async () => {
      const userAbilities = user!.abilities;
      userAbilities.forEach((ability, index) => {
        if (!abilities.includes(ability.name.toLocaleLowerCase())) return;
        if (ability.quantity === 1) userAbilities.splice(index, 1);
        userAbilities[index].quantity--;
      });
      console.log("new abilities", userAbilities);
      await updateUser({ abilities: userAbilities });
    };
    reduceAbilityQuantity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abilities, answerState, updateUser]);

  return (
    <div className="fixed w-full h-full left-0 top-0 bg-white flex flex-col p-3">
      {gameState === "ability" && (
        <Ability onQuit={() => navigate(callBackUrl)} />
      )}
      {gameState === "countdown" && (
        <CountDown onDone={() => setGameState("questioning")} />
      )}
      {gameState === "questioning" && !abilities.includes("fore sight") && (
        <Questioning onDone={() => setGameState("answer")} />
      )}
      {gameState === "questioning" && abilities.includes("fore sight") && (
        <ForeSight onDone={() => setGameState("answer")} />
      )}
      {gameState === "answer" && <Answer onSubmit={handleSubmit} />}
      {answerState === "correct" && (
        <ResultModal type="correct">
          <Correct />
        </ResultModal>
      )}
      {answerState === "wrong" && (
        <ResultModal type="wrong">
          <Wrong />
        </ResultModal>
      )}
      {answerState === "timeout" && (
        <ResultModal type="timeout">
          <Timeout />
        </ResultModal>
      )}
      {showReview && <Review />}
      {children}
    </div>
  );
};

export default Game;
