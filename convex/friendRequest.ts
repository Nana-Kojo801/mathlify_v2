import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAllUserRequests = query({
  handler: async (ctx) => {
    const userId = (await getAuthUserId(ctx))!;

    const requests = await ctx.db
      .query("friendRequests")
      .filter((q) =>
        q.or(
          q.eq(q.field("receiverId"), userId),
          q.eq(q.field("senderId"), userId)
        )
      )
      .collect();

    return requests;
  },
});

export const getUserReceivedRequests = query({
  handler: async (ctx) => {
    const userId = (await getAuthUserId(ctx))!;

    const requests = await ctx.db
      .query("friendRequests")
      .filter((q) => q.eq(q.field("receiverId"), userId))
      .collect();

    return await Promise.all(
      requests.map(async (request) => {
        const sender = (await ctx.db.get(request.senderId))!;
        const receiver = (await ctx.db.get(request.receiverId))!;
        return { ...request, sender, receiver };
      })
    );
  },
});

export const acceptRequest = mutation({
  args: { requestId: v.id("friendRequests"), senderId: v.id("users") },
  handler: async (ctx, { senderId, requestId }) => {
    const userId = (await getAuthUserId(ctx))!;
    const user = (await ctx.db.get(userId))!;
    const sender = (await ctx.db.get(senderId))!;

    await Promise.all([
      ctx.db.delete(requestId),
      ctx.db.patch(senderId, {
        friends: Array.from(new Set([...sender.friends, userId])),
      }),
      ctx.db.patch(userId, {
        friends: Array.from(new Set([...user.friends, senderId])),
      }),
    ]);
  },
});

export const create = mutation({
  args: { receiverId: v.id("users") },
  handler: async (ctx, { receiverId }) => {
    const userId = (await getAuthUserId(ctx))!;
    await ctx.db.insert("friendRequests", { receiverId, senderId: userId });
  },
});
