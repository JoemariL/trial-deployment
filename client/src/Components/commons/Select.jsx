import React, { Fragment, useState, useCallback } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Listbox, Transition } from "@headlessui/react";
import classnames from "classnames";

const Select = ({
  className = "",
  selectStyle = "",
  name = "",
  items = [],
  label = "",
  subtitle = "",
  asFormInput = false,
  onChange = () => {},
  disabled = false,
}) => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const onChangeCb = useCallback(
    (item) => {
      if (asFormInput) {
        let event = { target: { name: name, value: item } };
        setSelectedItem(item);
        return onChange(event);
      }

      if (onChange) {
        setSelectedItem(item);
        return onChange(item);
      }
    },
    [asFormInput, name, onChange]
  );

  return (
    <div className={classnames(className)}>
      <span>{label}</span>
      <div className="grid grid-row-2 space-y-2">
        <Listbox
          as="div"
          className="relative"
          value={selectedItem}
          onChange={onChangeCb}
          disabled={disabled}
        >
          {({ open }) => (
            <>
              <Listbox.Button
                className={classnames(
                  "h-12 w-full p-2 flex justify-between items-center rounded border-2 border-gray-300 bg-white",
                  selectStyle
                )}
              >
                {selectedItem}
                <IoIosArrowDropdown
                  className={open ? "h-6 w-6 rotate-180" : "h-6 w-6"}
                />
              </Listbox.Button>
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Listbox.Options className="absolute w-full mt-2 z-2 rounded border-2 border-gray-300 bg-white">
                  {items.map((item) => (
                    <Listbox.Option
                      className="p-2 rounded cursor-pointer select-none hover:bg-blue-700 hover:text-white"
                      key={item}
                      value={item}
                    >
                      {item}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </>
          )}
        </Listbox>
        <span className="px-2 text-sm text-gray-500">{subtitle}</span>
      </div>
    </div>
  );
};

export default Select;
