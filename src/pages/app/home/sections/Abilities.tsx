import { useAuth } from "@/hooks/useAuth";

const Abilities = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col border-b border-b-gray-300 pb-3">
      <h2 className="text-xl font-bold text-purple-900">Abilities</h2>
      <div className="flex flex-col">
        {user?.abilities.map(({ name, quantity }) => (
          <div key={name} className="py-2 flex items-center justify-between text-lg border-b border-b-400">
            <p>{name}</p>
            <p className="font-bold text-[15px] text-white bg-purple-900 px-2 rounded-3xl">
              x{quantity}
            </p>
          </div>
        ))}
        {!user?.abilities.length && <p>No abilities</p>}
      </div>
    </div>
  );
};

export default Abilities;
