import { Difficulty } from "@/types/types";

export const wait = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds));

export function getRandomNumbers(difficulty: Difficulty): number[] {
  // Destructure the range and quantity values from the difficulty object
  const {
    range: { from, to },
    quantity: { min, max },
  } = difficulty;

  // Determine a random count within the min and max range
  const times = Math.floor(Math.random() * (max - min + 1)) + min;

  const numbers = [];
  let lastNumber = null;

  for (let i = 0; i < times; i++) {
    let randomValue;
    do {
      // Generate random number between from and to (inclusive)
      randomValue = Math.floor(Math.random() * (to - from + 1)) + from;
      // Randomly determine positive or negative
      randomValue = Math.random() < 0.5 ? -randomValue : randomValue;
    } while (randomValue === lastNumber);

    numbers.push(randomValue);
    lastNumber = randomValue;
  }

  return numbers;
}

export const getDifficultyByLevel = (level: number): Difficulty => {
  let range, quantity, interval, timer;

  if (level <= 50) {
    range = { from: 1, to: level * 2 };
    quantity = { min: 3, max: 5 };
    interval = 1.25 - (level - 1) * 0.02; // Reduced decrement from 0.025 to 0.02
    timer = Math.min(10, 5 + Math.floor((level - 1) / 15)); // Increase every 15 levels instead of 10
  } else if (level <= 100) {
    range = { from: level, to: level * 3 };
    quantity = { min: 5, max: 7 };
    interval = 1.0 - (level - 51) * 0.008; // Reduced decrement from 0.01 to 0.008
    timer = Math.min(10, 5 + Math.floor((level - 1) / 15));
  } else if (level <= 200) {
    range = { from: level, to: level * 4 };
    quantity = { min: 7, max: 10 };
    interval = 0.75 - (level - 101) * 0.004; // Reduced decrement from 0.005 to 0.004
    timer = Math.min(10, 5 + Math.floor((level - 1) / 15));
  } else if (level <= 300) {
    range = { from: level, to: level * 5 };
    quantity = { min: 9, max: 12 };
    interval = 0.5 - (level - 201) * 0.002; // Reduced decrement from 0.0025 to 0.002
    timer = Math.min(10, 5 + Math.floor((level - 1) / 15));
  } else if (level <= 400) {
    range = { from: level, to: level * 6 };
    quantity = { min: 12, max: 15 };
    interval = 0.25 - (level - 301) * 0.0008; // Reduced decrement from 0.001 to 0.0008
    timer = Math.min(10, 5 + Math.floor((level - 1) / 15));
  } else {
    range = { from: level, to: level * 7 };
    quantity = { min: 15, max: 18 };
    interval = Math.max(0.1, 0.1 - (level - 401) * 0.0004); // Reduced decrement from 0.0005 to 0.0004
    timer = Math.min(10, 5 + Math.floor((level - 1) / 15));
  }

  return {
    range,
    quantity,
    interval,
    timer,
  };
};

export const levels = Array.from({ length: 500 }).map((_, i) => ({
  level: i + 1,
  ...getDifficultyByLevel(i + 1),
}));

export function getDifficultyByRound(round: number): Difficulty {
  let range, quantity, interval, timer;

  if (round <= 50) {
    range = { from: 1, to: round * 2 };
    quantity = { min: 3, max: 5 };
    interval = 1.25 - (round - 1) * 0.025; // Starts at 1.25 and decreases by 0.025 per round
    timer = Math.min(10, Math.floor(5 + (round - 1) / 10)); // Starts at 5 and increases by 1 every 10 rounds
  } else if (round <= 100) {
    range = { from: round, to: round * 3 };
    quantity = { min: 5, max: 7 };
    interval = 1.0 - (round - 51) * 0.01; // Starts at 1.0 and decreases by 0.01 per round
    timer = Math.min(10, Math.floor(5 + (round - 50) / 10)); // Starts at 5 and increases by 1 every 10 rounds
  } else if (round <= 200) {
    range = { from: round, to: round * 4 };
    quantity = { min: 7, max: 10 };
    interval = 0.75 - (round - 101) * 0.005; // Starts at 0.75 and decreases by 0.005 per round
    timer = Math.min(10, Math.floor(5 + (round - 100) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  } else if (round <= 300) {
    range = { from: round, to: round * 5 };
    quantity = { min: 9, max: 12 };
    interval = 0.5 - (round - 201) * 0.0025; // Starts at 0.5 and decreases by 0.0025 per round
    timer = Math.min(10, Math.floor(5 + (round - 200) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  } else if (round <= 400) {
    range = { from: round, to: round * 6 };
    quantity = { min: 12, max: 15 };
    interval = 0.25 - (round - 301) * 0.001; // Starts at 0.25 and decreases by 0.001 per round
    timer = Math.min(10, Math.floor(5 + (round - 300) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  } else {
    range = { from: round, to: round * 7 };
    quantity = { min: 15, max: 18 };
    interval = Math.max(0.1, 0.1 - (round - 401) * 0.0005); // Starts at 0.1 and decreases by 0.0005 per round, with a minimum of 0.1
    timer = Math.min(10, Math.floor(5 + (round - 400) / 20)); // Starts at 5 and increases by 1 every 20 rounds
  }

  return {
    range,
    quantity,
    interval,
    timer,
  };
}
