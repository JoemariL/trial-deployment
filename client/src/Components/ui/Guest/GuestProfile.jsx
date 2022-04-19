import classnames from "classnames";
import { FaUserAlt } from "react-icons/fa";
import { Icon } from "../../commons";

const GuestProfile = ({
  userFullName = "",
  contactNumber = "",
  loading = false,
}) => {
  return (
    <div
      className={classnames(
        "w-full p-5 inline-flex items-center gap-x-5 bg-slate-100 rounded",
        loading ? "blur-sm animate-pulse" : ""
      )}
    >
      <Icon
        background="rounded"
        className="bg-blue-900 text-white"
        icon={<FaUserAlt className="h-4 w-4" />}
      />
      <div className="flex flex-col">
        <span className="font-bold">{userFullName}</span>

        <span className="text-sm text-gray-600">{contactNumber}</span>
      </div>
    </div>
  );
};

export default GuestProfile;
