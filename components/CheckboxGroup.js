import React, { useContext } from "react";
import { ToolsContext } from "../contexts/ToolsContext";

function CheckboxGroup({
  className = "",
  label = "",
  name = "",
  defaultChecked = false,
  onChange = () => {},
  ...newProps
}) {
  const { handleChange } = useContext(ToolsContext);
  const finalClass = `${className} appearance-none w-6 h-6 border border-gray-900 rounded-sm outline-none cursor-pointer checked:bg-gray-900`;
  return (
    <div className="w-full flex items-center">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        onChange={(e) => handleChange(e)}
        className={finalClass}
        {...newProps}
      />
      <label className="ml-2 text-sm text-gray-900" htmlFor={name}>
        {label}
      </label>
    </div>
  );
}

export default CheckboxGroup;
