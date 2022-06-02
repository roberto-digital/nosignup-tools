import React from "react";
import Image from "next/image";
import Link from "next/link";

import Button from "./Button";

function SimpleCard({
  className = "",
  image = "",
  title = "",
  text = "",
  url = null,
  share = false,
  featured = false,
  buttonText = null,
  buttonLink = "",
  html = null,
  ...newProps
}) {
  let finalClass = `${className} w-72 max-w-full border border-gray-300 text-gray-900 rounded-sm bg-white`;
  return (
    <>
      <div className={finalClass}>
        <Link href={`/tools/${title.toLowerCase().replace(/ /g, "-")}`}>
          {image && (
            <div className="w-full h-48 relative cursor-pointer">
              <Image
                objectFit="cover"
                layout="fill"
                src={image}
                placeholder="blur"
                blurDataURL={`/_next/image?url=${image}&w=16&q=1`}
                alt={`${title} screenshot`}
              />
              {featured && (
                <div className="overflow-hidden h-full">
                  <div className="bg-purple text-white font-bold origin-top float-right mt-9 mr-9 w-72 text-center transform translate-x-36 rotate-45">
                    <div>STAFF PICK</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Link>

        <div className="p-6">
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
    </>
  );
}

export default SimpleCard;
