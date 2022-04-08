import classnames from "classnames";

const ListItem = ({
  className = "",
  textColor = "black" || "white" || "blue",
  label = "",
  subtitle = "",
  position = "vertical" || "horizontal",
  icon,
  onClick = () => {},
  loading = false,
  addItem,
}) => {
  return (
    <div
      className={classnames(
        className,
        "p-3",
        position === "vertical"
          ? "flex flex-row items-center gap-x-3"
          : "flex flex-col space-y-3",
        textColor === "blue"
          ? "text-blue-900"
          : textColor === "white"
          ? "text-white"
          : "text-black",
        loading ? "blur-sm animate-pulse" : ""
      )}
      onClick={onClick}
    >
      {icon}

      <div className="w-full flex flex-row items-center gap-x-3">
        <div className="flex flex-col">
          <span className="font-bold">{label}</span>
          <span className="text-sm">{subtitle}</span>
        </div>

        {addItem}
      </div>
    </div>
  );
};

export default ListItem;
