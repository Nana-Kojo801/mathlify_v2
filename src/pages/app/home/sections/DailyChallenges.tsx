import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useEffect } from "react";

const SkeletionDailyChallenge = () => {
  return (
    <>
      <div className="mt-1 pb-3 border-b border-b-gray-400 animate-pulse">
        <div className="h-6 bg-gray-300 w-3/4 rounded-md mb-2"></div>{" "}
        {/* Skeleton for the first heading */}
        <div className="h-4 bg-gray-200 w-5/6 rounded-md mb-3"></div>{" "}
        {/* Skeleton for the first paragraph */}
        <div className="h-10 bg-gray-300 w-full rounded-md"></div>{" "}
        {/* Skeleton for the button */}
      </div>

      <div className="mt-3 pb-3 border-b border-b-gray-400 animate-pulse">
        <div className="h-6 bg-gray-300 w-2/3 rounded-md mb-2"></div>{" "}
        {/* Skeleton for the second heading */}
        <div className="h-4 bg-gray-200 w-5/6 rounded-md"></div>{" "}
        {/* Skeleton for the second paragraph */}
      </div>
    </>
  );
};

const DailyChallenges = () => {
  const dailyChallenge = useQuery(api.dailyChallenge.getCurrentDailyChallenge);
  const createDailyChallenge = useMutation(
    api.dailyChallenge.createDailyChallenge
  );

  useEffect(() => {
    const initChallenge = async () => {
      if (dailyChallenge === undefined) return;
      await createDailyChallenge();
    };
    initChallenge();
  }, [dailyChallenge, createDailyChallenge]);

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold text-purple-900">Daily Challenges</h2>
      {!dailyChallenge ? (
        <SkeletionDailyChallenge />
      ) : (
        <>
          <div className="mt-1 pb-3 border-b border-b-gray-400">
            <h3 className="text-lg font-bold">Today's lucky number is {dailyChallenge.luckyNumber.number}</h3>
            <p className="italic text-gray-500">
              Try to get the number {dailyChallenge.luckyNumber.number} as the correct answer in any game mode but
              pratice
            </p>
            <button
              onClick={() => {}}
              className="mt-3 p-[8px] bg-purple-900 text-white text-[15px] rounded-md w-full"
            >
              Recieve reward (+5 chips)
            </button>
          </div>
          <div className="mt-3 pb-3 border-b border-b-gray-400">
            <h3 className="text-lg font-bold">
              Which round to next? Round {dailyChallenge.marathonRound.round} it is
            </h3>
            <p className="italic text-gray-500">
              Get to round {dailyChallenge.marathonRound.round} in marathon and win. Good luck
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default DailyChallenges;
