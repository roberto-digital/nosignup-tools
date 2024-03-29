import React, { useContext } from "react";
import { ToolsContext } from "../contexts/ToolsContext";

function RadioGroup({
  className = "",
  label = "",
  name,
  radios = [],
  onChange = () => {},
  error = false,
  errorText = "",
  description = "",
  horizontal = false,
  ...newProps
}) {
  const { handleChange } = useContext(ToolsContext);
  const hasError = error || errorText;
  let finalClass = `${className}`;
  if (hasError) finalClass += " border-red-600";
  let radiosWrapperClass = "";
  let radioClass = "flex items-center";
  if (horizontal) {
    radiosWrapperClass += "flex flex-wrap";
    radioClass += " mr-4";
  } else radioClass += " mb-3 last:mb-0";
  const Radios = radios.map((r) => (
    <div key={`${r.value}-${name}`} className={radioClass}>
      <input
        name={name}
        value={r.value}
        type="radio"
        className="appearance-none w-6 h-6 border border-purple rounded-full outline-none cursor-pointer checked:bg-purple"
        id={`${r.value}-${name}`}
        onChange={(e) => handleChange(e)}
        defaultChecked={r.checked}
      />
      <label className="ml-2 text-sm" htmlFor={`${r.value}-${name}`}>
        {r.label}
      </label>
    </div>
  ));
  return (
    <div className={finalClass} {...newProps}>
      {label && (
        <label
          className={`mb-4 text-sm text-gray-900 inline-block ${
            hasError && "text-red-600"
          }`}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <div className={radiosWrapperClass}>{Radios}</div>
      {description && (
        <span className="mt-2 text-gray-900 text-xs">{description}</span>
      )}
      {errorText && (
        <div className="bg-red-200 mt-2 py-2 px-4 text-xs text-red-600 rounded-sm">
          {errorText}
        </div>
      )}
    </div>
  );
}

export default RadioGroup;
