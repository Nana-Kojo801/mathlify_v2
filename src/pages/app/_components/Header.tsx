import { FaFire } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-3 flex items-center justify-between border-b border-b-gray-200">
      <div className="flex items-center gap-1">
        <img
          className="w-[32px] rounded-full object-cover"
          src="/logo-192x192.png"
          alt="Logo"
        />
        <p className="text-purple-900 text-xl font-bold">Mathlify</p>
      </div>
      <Link to="/app/abilities">
        <FaFire className="text-3xl text-purple-900" />
      </Link>
    </header>
  );
};

export default Header;
