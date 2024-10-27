import {
  FaHouse,
  FaLightbulb,
  FaPersonRunning,
  FaShapes,
  FaUserGroup,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { Icon: FaHouse, to: "/app" },
  { Icon: FaPersonRunning, to: "/app/marathon" },
  { Icon: FaUserGroup, to: "/app/online" },
  { Icon: FaShapes, to: "/app/levels" },
  { Icon: FaLightbulb, to: "/app/practice" },
];

const Footer = () => {
  const location = useLocation();
  return (
    <footer className="flex items-center justify-evenly gap-10 p-4 border-t border-t-gray-200">
      {navLinks.map(({ to, Icon }) => (
        <Link key={to} to={to}>
          <Icon
            className={`text-[25px] ${location.pathname === to ? "text-purple-900" : ""}`}
          />
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
