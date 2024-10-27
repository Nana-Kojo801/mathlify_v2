import { Difficulty } from "@/types/types";
import { getRandomNumbers } from "@/utils/utils";
import { create } from "zustand";

type GameState = "ability" | "countdown" | "questioning" | "answer";
type AnswerState = "correct" | "wrong" | "timeout" | null;

type GameStoreType = {
  difficulty: Difficulty | null;
  gameState: GameState;
  numbers: number[];
  correctAnswer: number | null;
  showReview: boolean;
  setShowReview: (showReview: boolean) => void;
  answerState: "correct" | "wrong" | "timeout" | null;
  abilities: string[];
  init: (difficulty: Difficulty) => void;
  addAbility: (ability: string) => void;
  retry: () => void;
  setGameState: (gameState: GameState) => void;
  setAnswerState: (answerState: AnswerState) => void;
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
  reset: () => void;
};

export const useGame = create<GameStoreType>((set) => ({
  difficulty: null,
  gameState: "ability",
  numbers: [],
  correctAnswer: null,
  showReview: false,
  setShowReview: (showReview) => set({ showReview }),
  answerState: null,
  abilities: [],
  submitted: false,
  setSubmitted: (submitted) => set({ submitted }),
  init: (difficulty) => {
    const numbers = getRandomNumbers(difficulty);
    set((state) => {
      state.reset();
      return {
        difficulty,
        numbers,
        correctAnswer: numbers.reduce((a, b) => a + b, 0),
      };
    });
  },
  reset: () => {
    set({
      numbers: [],
      correctAnswer: null,
      showReview: false,
      answerState: null,
      abilities: [],
      gameState: "ability",
      submitted: false,
      difficulty: null
    });
  },
  retry: () => {
    set((state) => {
      const numbers = getRandomNumbers(state.difficulty!)
      return {
        gameState: "ability",
        answerState: null,
        abilities: [],
        submitted: false,
        numbers,
        correctAnswer: numbers.reduce((a, b) => a + b, 0),
      };
    });
  },
  addAbility: (ability) => {
    set((state) => {
      const index = state.abilities.indexOf(ability);
      if (index === -1) return { abilities: [...state.abilities, ability] };
      else return { abilities: state.abilities.filter((ab) => ab !== ability) };
    });
  },
  setGameState: (gameState) => set({ gameState }),
  setAnswerState: (answerState) => set({ answerState }),
}));
