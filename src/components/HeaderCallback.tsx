import { FaArrowLeft } from "react-icons/fa6";

const HeaderCallback = ({
  callback,
  title,
  children,
}: {
  callback: () => void;
  title: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      onClick={callback}
      className="flex items-center justify-between text-purple-900 border-b border-b-gray-200 p-3 px-4"
    >
      <div className="flex items-center gap-3">
        <button>
          <FaArrowLeft className="text-xl" />
        </button>
        <p className="text-2xl font-bold">{title}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default HeaderCallback;
