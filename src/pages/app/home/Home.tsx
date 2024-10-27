import Stats from "./sections/Stats";
import Abilities from "./sections/Abilities";
import Friends from "./sections/Friends";


const Home = () => {
  return (
    <div className="w-full h-full pt-1 p-3 overflow-y-auto flex flex-col gap-5">
        {/* <DailyChallenges /> */}
        <Stats />
        <Abilities />
        <Friends />
    </div>
  )
};

export default Home;
