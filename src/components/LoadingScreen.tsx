import { RotatingLines } from "react-loader-spinner";

const LoadingScreen = () => {
  return (
    <div className="fixed left-0 top-0 w-screen h-dvh bg-white grid place-content-center">
      <RotatingLines strokeColor="purple" width="70" />
      <div className="flex items-center gap-1 absolute bottom-10 left-2/4 translate-x-[-50%]">
        <img className="w-[35px] rounded-full" src="/logo-192x192.png" alt="" />
        <p className="text-2xl font-bold text-purple-900">Mathlify</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
