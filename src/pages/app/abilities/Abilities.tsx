import { abilities } from "@/abilities/abilities";
import HeaderCallback from "@/components/HeaderCallback";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";
import { useNavigate } from "react-router-dom";

const Abilities = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const updateUser = useMutation(api.user.updateUser);

  const buy = async (name: string, price: number) => {
    if (user!.chips < price) return;
    const userAbilties = user!.abilities;
    const index = userAbilties.findIndex((ab) => ab.name === name);
    if (index === -1) userAbilties.push({ name, quantity: 1 });
    else userAbilties[index].quantity++;
    await updateUser({ chips: user!.chips - price, abilities: userAbilties });
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-dvh flex flex-col bg-white overflow-y-auto">
      <HeaderCallback title="Abilities" callback={() => navigate("/app")}>
        <div className="flex gap-2 items-center justify-center text-white text-lg bg-purple-900 py-1 px-3 rounded-md">
          <p className="font-bold">Chips: {user!.chips}</p>
        </div>
      </HeaderCallback>
      <div className="flex-grow flex flex-col mt-2 px-2 gap-3 overflow-y-auto">
        {abilities.map(({ name, price, description }) => (
          <div
            key={name}
            className="flex flex-col p-3 border border-gray-400 rounded-lg gap-1"
          >
            <h2 className="font-bold text-xl">{name}</h2>
            <p className="text-gray-500 italic">{description}</p>
            <button
              disabled={user!.chips < price}
              onClick={() => buy(name, price)}
              className="p-[10px] rounded-md bg-purple-900 text-white text-sm mt-1 disabled:bg-gray-400"
            >
              Buy ({price} chips)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Abilities;
