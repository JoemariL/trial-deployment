import classnames from "classnames";

const RadioButton = ({
  className = "",
  rbStyle = "",
  label = "",
  name = "",
  id = "",
  defaultChecked,
  checked,
  value,
  onChange = () => {},
  disabled = false,
  required = false,
}) => {
  return (
    <div className={classnames("flex flex-row items-center", className)}>
      <input
        className={classnames("h-5 w-5", "mx-2", rbStyle)}
        type="radio"
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        name={name}
        id={id}
        checked={checked}
        disabled={disabled}
        required={required}
      />
      <span>{label}</span>
    </div>
  );
};

export default RadioButton;
