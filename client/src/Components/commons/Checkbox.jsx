import classnames from "classnames";

const Checkbox = ({
  cbStyle = "",
  label = "",
  name = "",
  id = "",
  value,
  onChange = () => {},
  checked,
  disabled = false,
}) => {
  return (
    <div className="flex flex-row items-center">
      <input
        className={classnames("h-5 w-5", "mx-2", cbStyle)}
        type="checkbox"
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        checked={checked}
        disabled={disabled}
      />
      <span>{label}</span>
    </div>
  );
};

export default Checkbox;
