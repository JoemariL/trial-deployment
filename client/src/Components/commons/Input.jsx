import React, { useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames";

const Input = ({
  className = "",
  label = "",
  subtitle = "",
  type,
  id = "",
  name = "",
  placeholder = "",
  minLength = 0,
  maxLength = 100,
  defaultValue,
  value,
  onChange = () => {},
  focus = false,
  loading = false,
  error,
  required = false,
  iconRight,
  disabled = false,
}) => {
  const ref = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const onFocusCb = useCallback(() => {
    return setIsFocused(true);
  }, []);

  const onBlurCb = useCallback(() => {
    return setIsFocused(false);
  }, []);

  useEffect(() => {
    if (focus && ref && ref.current) {
      ref.current.focus();
      setIsFocused(true);
    }
  }, [focus]);

  return (
    <div className={classnames("grid grid-row-4 space-y-2", className)}>
      <span>{label}</span>
      <div
        className={classnames(
          "h-12 px-2 inline-flex items-center border-2 rounded border-gray-300 bg-white focus-within:border-blue-800",
          error
            ? "border-red-600 focus-within:border-red-600"
            : "border-gray-300",
          disabled ? "bg-slate-100" : ""
        )}
      >
        <input
          className={classnames(
            "p-1.5 w-full rounded-full focus:outline-none",
            loading ? "blur-sm animate-pulse" : "",
            error ? "bg-red-50" : ""
          )}
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          minLength={minLength}
          maxLength={maxLength}
          defaultValue={defaultValue}
          value={value}
          ref={ref}
          onFocus={onFocusCb}
          onBlur={onBlurCb}
          onChange={onChange}
          required={required}
          disabled={disabled}
          autoComplete="off"
        />
        {iconRight}
      </div>
      {error ? (
        <span className="px-2 text-sm text-red-600">{error}</span>
      ) : (
        <span className="px-2 text-sm text-gray-500">{subtitle}</span>
      )}
    </div>
  );
};

export default Input;
