import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
  ...authTables,
  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    username: v.string(),
    elo: v.number(),
    chips: v.number(),
    avatar: v.string(),
    marathonData: v.object({
      highestRound: v.number(),
      playCount: v.number(),
      totalCorrects: v.number(),
      totalWrongs: v.number(),
    }),
    completedLevels: v.array(v.number()),
    friends: v.array(v.id("users")),
    unreadMessages: v.array(
      v.object({
        userId: v.id("users"),
        count: v.number(),
      })
    ),
    abilities: v.array(
      v.object({
        name: v.string(),
        quantity: v.number(),
      })
    ),
  })
    .index("email", ["email"])
    .searchIndex("search_user", {
      searchField: "username",
    }),
  dailyChallenges: defineTable({
    userId: v.id("users"),
    date: v.string(),
    luckyNumber: v.object({
      number: v.number(),
      completed: v.boolean(),
      reward: v.boolean(),
    }),
    marathonRound: v.object({
      round: v.number(),
      completed: v.boolean(),
      reward: v.boolean(),
    }),
  }),
  friendRequests: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users")
  }),
  friendMessges: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    message: v.string()
  })
});

export default schema;
