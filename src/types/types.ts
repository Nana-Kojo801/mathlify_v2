import { Id } from "@convex/_generated/dataModel";

export type User = {
  _id: Id<"users">;
  _creationTime: number;
  email?: string | undefined;
  username: string;
  elo: number;
  avatar: string;
  chips: number;
  marathonData: {
    highestRound: number;
    playCount: number;
    totalCorrects: number;
    totalWrongs: number;
  };
  completedLevels: number[];
  friends: string[];
  unreadMessages: { userId: Id<"users">, count: number }[];
  abilities: { name: string; quantity: number; }[]
};

export type DailyChallenge = {
  userId: string;
  date: string;
  luckyNumber: {
    number: number;
    reward: boolean;
    completed: boolean;
  };
  marathonRound: {
    round: number;
    reward: boolean;
    completed: boolean;
  };
}

export type Difficulty = {
	range: {
		from: number;
		to: number;
	};
	quantity: {
		min: number;
		max: number;
	};
	timer: number;
	interval: number;
};