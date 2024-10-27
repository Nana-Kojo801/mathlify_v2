import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validators/validators";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import { RotatingLines } from "react-loader-spinner";

const Signup = () => {
  const [error, setError] = useState<string | null>(null);
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (
    values
  ) => {
    try {
      await signInUser(values);
      navigate("/app");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center p-3">
      <h3 className="text-2xl font-bold">
        Sign up for <span className="text-purple-900">Mathlify</span>
      </h3>
      <Link to="/auth/signup" className="mt-1 text-lg">
        Don't have an account?{" "}
        <span className="font-bold text-purple-900 text-lg">
          {" "}
          Sign up{" "}
        </span>
      </Link>
      {error && (
        <p className="mt-2 p-[10px] text-red-600 bg-red-300 rounded-md">
          {error}
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-5 flex flex-col gap-5"
      >
        <input name="flow" type="hidden" value="signUp" />
        <div className="w-full flex flex-col">
          <label className="font-bold text-lg" htmlFor="email">
            {" "}
            Email{" "}
          </label>
          <div className="w-full relative">
            <input
              {...register("email")}
              className="w-full py-[10px] indent-2 rounded-md bg-gray-100 outline-2 outline-purple-900"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
            />
            <FaEnvelope className="absolute right-3 top-2/4 translate-y-[-50%]" />
          </div>
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="w-full flex flex-col">
          <label className="font-bold text-lg" htmlFor="password">
            {" "}
            Password{" "}
          </label>
          <div className="w-full relative">
            <input
              {...register("password")}
              className="w-full py-[10px] indent-2 rounded-md bg-gray-100 outline-2 outline-purple-900"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
            />
            <FaLock className="absolute right-3 top-2/4 translate-y-[-50%]" />
          </div>
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <button
          disabled={isSubmitting}
          className="mt-2 p-[10px] bg-purple-900 disabled:bg-gray-200 text-white rounded-md grid place-content-center"
        >
          {isSubmitting ? (
            <RotatingLines width="25" strokeColor="purple" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Signup;
