import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getCurrentUserChat = query({
  args: { friendId: v.id("users") },
  handler: async (ctx, { friendId }) => {
    const userId = (await getAuthUserId(ctx))!;

    const messages = await ctx.db
      .query("friendMessges")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("senderId"), userId),
            q.eq(q.field("receiverId"), friendId)
          ),
          q.and(
            q.eq(q.field("senderId"), friendId),
            q.eq(q.field("receiverId"), userId)
          )
        )
      )
      .collect();

    return messages;
  },
});

export const sendMessage = mutation({
  args: { receiverId: v.id("users"), message: v.string() },
  handler: async (ctx, { receiverId, message }) => {
    const senderId = (await getAuthUserId(ctx))!;
    const receiver = (await ctx.db.get(receiverId))!;
    const index = receiver.unreadMessages.findIndex(
      (msg) => msg.userId === senderId
    );
    if (index === -1)
      receiver.unreadMessages.push({ userId: senderId, count: 1 });
    else receiver.unreadMessages[index].count++;
    await Promise.all([
      ctx.db.insert("friendMessges", { senderId, receiverId, message }),
      ctx.db.patch(receiverId, { unreadMessages: receiver.unreadMessages }),
    ]);
  },
});
