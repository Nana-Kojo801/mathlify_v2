import { useAuth } from "@/hooks/useAuth";

const Stats = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col border-b border-b-gray-300 pb-3">
      <h2 className="text-xl font-bold text-purple-900">Stats</h2>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="border border-purple-900 p-3 rounded-lg">
          <h4 className="text-purple-900 font-bold text-lg">Elo</h4>
          <h2 className="font-bold text-xl">{user?.elo}</h2>
        </div>
        <div className="border border-purple-900 p-3 rounded-xl">
          <h4 className="text-purple-900 font-bold text-lg">Chips</h4>
          <h2 className="font-bold text-xl">{user?.chips}</h2>
        </div>
      </div>
    </div>
  );
};

export default Stats;
