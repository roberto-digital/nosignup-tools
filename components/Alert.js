import React from "react";

function Alert({
  className = "",
  content = "",
  type = "primary",
  ...newProps
}) {
  let finalClass = `${className} w-full px-6 py-3 rounded-sm border`;
  if (type === "primary")
    finalClass += " text-green-800 bg-green-400 border-green-500";
  else if (type === "secondary")
    finalClass += " text-blue-800 bg-blue-400 border-blue-500";
  else if (type === "danger")
    finalClass += " text-red-800 bg-red-400 border-red-500";
  else if (type === "warning")
    finalClass += " text-yellow-800 bg-yellow-400 border-yellow-500";
  else if (type === "info")
    finalClass += " text-indigo-800 bg-indigo-400 border-indigo-500";
  else if (type === "light")
    finalClass += " text-gray-800 bg-gray-200 border-gray-300";
  else if (type === "dark")
    finalClass += " text-black bg-gray-700 border-gray-800";
  return (
    <div className={finalClass} {...newProps} role="alert">
      {content}
    </div>
  );
}

export default Alert;
