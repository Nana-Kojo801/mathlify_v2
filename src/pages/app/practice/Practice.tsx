import { useGame } from "@/stores/gameStore";
import { Difficulty } from "@/types/types";
import { practiceSchema } from "@/validators/validators";
import { SubmitHandler, useForm } from "react-hook-form";
import { Outlet, useNavigate } from "react-router-dom";
import { z } from "zod";

const Practice = () => {
  const initGame = useGame((state) => state.init);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof practiceSchema>>({
    defaultValues: {
      quantity: { min: 5, max: 8 },
      range: { from: 1, to: 10 },
      interval: 1,
      timer: 5,
    },
  });

  const startGame: SubmitHandler<z.infer<typeof practiceSchema>> = (
    difficulty
  ) => {
    initGame(difficulty as unknown as Difficulty);
    navigate("play");
  };

  return (
    <div className="w-full h-full p-3 pb-0 flex flex-col">
      <main className="flex-grow overflow-y-auto mt-2">
        <form
          onSubmit={handleSubmit(startGame)}
          className="w-full flex flex-col gap-5"
        >
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-purple-900">Range</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="font-bold text-lg" htmlFor="min_range">
                  From
                </label>
                <input
                  className="w-full py-[10px] indent-2 rounded-md border-2 border-gray-200 outline-2 outline-purple-900"
                  type="number"
                  id="min_range"
                  {...register("range.from", { valueAsNumber: true })}
                />
                {errors.range?.from && (
                  <p className="text-sm text-red-600">
                    {errors.range?.from.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-lg" htmlFor="max_range">
                  To
                </label>
                <input
                  className="w-full py-[10px] indent-2 rounded-md border-2 border-gray-200 outline-2 outline-purple-900"
                  type="number"
                  id="max_range"
                  {...register("range.to", { valueAsNumber: true })}
                />
                {errors.range?.to && (
                  <p className="text-sm text-red-600">
                    {errors.range.to.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-purple-900">Quantity</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="font-bold text-lg" htmlFor="min_quantity">
                  Min
                </label>
                <input
                  className="w-full py-[10px] indent-2 rounded-md border-2 border-gray-200 outline-2 outline-purple-900"
                  type="number"
                  id="min_quantity"
                  {...register("quantity.min", { valueAsNumber: true })}
                />
                {errors.quantity?.min && (
                  <p className="text-sm text-red-600">
                    {errors.quantity.min.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="font-bold text-lg" htmlFor="max_quantity">
                  Max
                </label>
                <input
                  className="w-full py-[10px] indent-2 rounded-md border-2 border-gray-200 outline-2 outline-purple-900"
                  type="number"
                  id="max_quantity"
                  {...register("quantity.max", { valueAsNumber: true })}
                />
                {errors.quantity?.max && (
                  <p className="text-sm text-red-600">
                    {errors.quantity.max.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label
              className="text-xl font-bold text-purple-900"
              htmlFor="interval"
            >
              Time Interval(in seconds)
            </label>
            <input
              id="interval"
              type="number"
              min={0}
              step={0.01}
              className="w-full py-[10px] indent-2 rounded-md border-2 border-gray-200 outline-2 outline-purple-900"
              {...register("interval")}
            />
            {errors.interval && (
              <p className="text-sm text-red-600">
                {errors.interval.message}
              </p>
            )}
          </div>
          <div>
            <label
              className="text-xl font-bold text-purple-900"
              htmlFor="timer"
            >
              Timer(in seconds)
            </label>
            <input
              id="timer"
              type="number"
              className="w-full py-[10px] indent-2 rounded-md border-2 border-gray-200 outline-2 outline-purple-900"
              {...register("timer", { valueAsNumber: true })}
            />
            {errors.timer && (
              <p className="text-sm text-red-600">{errors.timer.message}</p>
            )}
          </div>
          <button className="w-full py-[10px] rounded-md bg-purple-900 text-white">
            Start
          </button>
        </form>
      </main>
      <Outlet />
    </div>
  );
};

export default Practice;
