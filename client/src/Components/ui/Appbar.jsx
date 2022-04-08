import classnames from "classnames";
import { HiMenuAlt3 } from "react-icons/hi";
import { Icon } from "../commons";

const Appbar = ({
  className = "",
  headerText = "",
  onMenuClick = () => {},
  disabled = false,
}) => {
  return (
    <div
      className={classnames("sticky w-full top-0 p-3 z-10 bg-white", className)}
    >
      <div className="flex flex-row items-center gap-x-3">
        <button
          className="rounded-full focus:outline-none hover:bg-slate-100"
          type="button"
          onClick={onMenuClick}
          disabled={disabled}
        >
          <Icon icon={<HiMenuAlt3 className="h-6 w-6" />} />
        </button>

        <span className="text-lg font-bold">{headerText}</span>
      </div>
    </div>
  );
};

export default Appbar;
