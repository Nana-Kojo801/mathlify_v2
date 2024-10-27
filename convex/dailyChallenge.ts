import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getCurrentDailyChallenge = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx)!;
    const dailyChallenge = await ctx.db
      .query("dailyChallenges")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("date"), new Date().toDateString())
        )
      )
      .first();
    return dailyChallenge;
  },
});

export const createDailyChallenge = mutation({
  handler: async (ctx) => {
    const userId = (await getAuthUserId(ctx))!;
    const currentDate = new Date().toDateString();
    const existingDailyChallenge = await ctx.db
      .query("dailyChallenges")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("date"), currentDate)
        )
      )
      .first();
    if (existingDailyChallenge) return;
    await ctx.db.insert("dailyChallenges", {
      userId,
      date: currentDate,
      luckyNumber: {
        number: Math.floor(Math.random() * 99) + 1,
        reward: false,
        completed: false,
      },
      marathonRound: { round: 5, reward: false, completed: false },
    });
  },
});
