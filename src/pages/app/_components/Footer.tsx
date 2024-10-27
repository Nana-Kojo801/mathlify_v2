import {
  FaHouse,
  FaLightbulb,
  FaPersonRunning,
  FaShapes,
  FaUserGroup,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { Icon: FaHouse, to: "/app", name: "Home" },
  { Icon: FaPersonRunning, to: "/app/marathon", name: "Marathon" },
  { Icon: FaUserGroup, to: "/app/online", name: "Online" },
  { Icon: FaShapes, to: "/app/levels", name: "Levels" },
  { Icon: FaLightbulb, to: "/app/practice", name: "Practice" },
];

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="flex items-center justify-center gap-8 p-4 border-t border-t-gray-200">
      {navLinks.map(({ to, Icon, name }) => (
        <Link
          className={`flex flex-col items-center ${location.pathname === to ? "text-purple-900" : ""}`}
          key={to}
          to={to}
        >
          <Icon className={`text-[20px]`} />
          <p className="text-[12px]">{name}</p>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
