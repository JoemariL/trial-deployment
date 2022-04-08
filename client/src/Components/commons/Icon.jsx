import classnames from "classnames";

const Icon = ({
  className = "",
  background = "rounded" || "rounded-full" || "none",
  icon,
}) => {
  return (
    <div
      className={classnames(
        "p-2 flex flex-row justify-center items-center",
        background === "rounded"
          ? "rounded"
          : background === "none"
          ? ""
          : "rounded-full",
        className
      )}
    >
      {icon}
    </div>
  );
};
export default Icon;
