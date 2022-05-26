import React from "react";
import Image from "next/image";

import Button from "./Button";

function SimpleCard({
  className = "",
  image = "",
  title = "",
  text = "",
  buttonText = null,
  buttonLink = "",
  html = null,
  ...newProps
}) {
  let finalClass = `${className} w-72 max-w-full border border-gray-300 rounded-sm bg-white`;
  return (
    <div className={finalClass}>
      {image && (
        <div className="w-full h-48 relative">
          <Image
            objectFit="cover"
            layout="fill"
            src={image}
            alt={`${title} screenshot`}
          />
        </div>
      )}
      <div className="p-6">
        {title && <h5 className="text-lg font-black">{title}</h5>}
        {text && <p className={`${title && "mt-2"}`}>{text}</p>}
        {html}
        {buttonText && (
          <div className="mt-4 flex">
            <Button
              size="sm"
              type="secondary"
              text={buttonText}
              link={buttonLink}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default SimpleCard;
