import classnames from "classnames";

const Menu = ({
  children,
  position = "vertical" || "horizontal",
  loading = false,
}) => {
  return (
    <div
      className={classnames(
        "rounded-md",
        position === "vertical"
          ? "flex flex-col"
          : "flex flex-row items-center",
        loading ? "blur-sm animate-pulse" : ""
      )}
    >
      {children}
    </div>
  );
};

export default Menu;
