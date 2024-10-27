import "@/App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "@/pages/auth/signup/Signup";
import Login from "@/pages/auth/login/Login";
import Home from "@/pages/app/home/Home";
import AppLayout from "@/pages/app/AppLayout";
import LoadingScreen from "@/components/LoadingScreen";
import RootLayout from "@/pages/RootLayout";
import { useAuth } from "@/hooks/useAuth";
import Practice from "@/pages/app/practice/Practice";
import PlayPractice from "@/pages/app/practice/PlayPractice";
import Levels from "@/pages/app/levels/Levels";
import PlayLevels from "@/pages/app/levels/PlayLevels";
import Marathon from "@/pages/app/marathon/Marathon";
import PlayMarathon from "@/pages/app/marathon/PlayMarathon";
import Abilities from "@/pages/app/abilities/Abilities";
import AddFriend from "@/pages/app/add-friend/AddFriend";
import FriendRequest from "@/pages/app/friend-requests/FriendRequest";
import Chat from "@/pages/app/chat/Chat";

const App = () => {
  const { userLoading } = useAuth();
  if (userLoading) return <LoadingScreen />;
  return (
    <RootLayout>
      <Routes>
        <Route path="auth">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>

        <Route path="app" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="abilities" element={<Abilities />} />
          <Route path="add-friend" element={<AddFriend />}/>
          <Route path="friend-requests" element={<FriendRequest />}/>
          <Route path="chat/:friendId" element={<Chat />} />
          <Route path="practice" element={<Practice />}>
            <Route path="play" element={<PlayPractice />} />
          </Route>
          <Route path="levels" element={<Levels />}>
            <Route path="play" element={<PlayLevels />} />
          </Route>
          <Route path="marathon" element={<Marathon />}>
            <Route path="play" element={<PlayMarathon />} />
          </Route>
        </Route>
      </Routes>
    </RootLayout>
  );
};

export default App;
