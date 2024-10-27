import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Password({
      profile: (params) => {
        return {
          email: params.email as string,
          username: params.username as string,
          chips: 10,
          elo: 100,
          avatar: `https://ui-avatars.com/api/?name=${params.username}`,
          marathonData: {
            highestRound: 0,
            playCount: 0,
            totalCorrects: 0,
            totalWrongs: 0,
          },
          completedLevels: [],
          friends: [],
          unreadMessages: [],
          abilities: []
        };
      },
    }),
  ],
});
