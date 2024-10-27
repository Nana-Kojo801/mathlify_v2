import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    const user = await ctx.db.get(userId);
    return user;
  },
});

export const getUser = query({
  args: { id: v.id("users") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getFriends = query({
  handler: async (ctx) => {
    const userId = (await getAuthUserId(ctx))!;
    const user = (await ctx.db.get(userId))!;

    return await Promise.all(
      user.friends.map((friendId) => {
        return ctx.db.get(friendId);
      })
    );
  },
});

export const completeLevel = mutation({
  args: { level: v.number(), chips: v.number() },
  handler: async (ctx, { level, chips }) => {
    const userId = (await getAuthUserId(ctx))!;
    const user = (await ctx.db.get(userId))!;

    await ctx.db.patch(userId, {
      completedLevels: Array.from(new Set([...user.completedLevels, level])),
      chips: user.chips + chips,
    });
  },
});

const updateUserArgs = {
  username: v.optional(v.string()),
  elo: v.optional(v.number()),
  chips: v.optional(v.number()),
  marathonData: v.optional(
    v.object({
      highestRound: v.number(),
      playCount: v.number(),
      totalCorrects: v.number(),
      totalWrongs: v.number(),
    })
  ),
  completedLevels: v.optional(v.array(v.number())),
  friends: v.optional(v.array(v.id("users"))),
  unreadMessages: v.optional(
    v.array(
      v.object({
        userId: v.id("users"),
        count: v.number(),
      })
    )
  ),
  abilities: v.optional(
    v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
      })
    )
  ),
};

export const updateUser = mutation({
  args: v.object(updateUserArgs),
  handler: async (ctx, args) => {
    const userId = (await getAuthUserId(ctx))!;

    await ctx.db.patch(userId, args);
  },
});

export const searchUser = query({
  args: { username: v.string() },
  handler: async (ctx, { username }) => {
    const userId = (await getAuthUserId(ctx))!;
    const users = await ctx.db
      .query("users")
      .withSearchIndex("search_user", (q) => q.search("username", username))
      .filter((q) => q.neq(q.field("_id"), userId))
      .collect();
    return users;
  },
});
