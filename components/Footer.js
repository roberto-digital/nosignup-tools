import React from "react";
import Script from "next/script";

export default function Footer() {
  return (
    <footer className="text-gray-900 body-font w-full">
      <div className="bg-purple">
        <div className="py-6 px-6 flex items-center justify-center sm:justify-center sm:flex-row flex-col">
          <a className="flex title-font font-medium text-gray-100">
            <span className="mx-3 text-xl font-bold">nosignup.tools</span>
          </a>
          <p className="text-sm text-gray-500 sm:mt-0 mx-3 mt-4">
            <a
              href="https://twitter.com/ckpleiser?ref_src=twsrc%5Etfw"
              className="twitter-follow-button"
              data-show-count="false"
            >
              @ckpleiser
            </a>
            <Script
              src="https://platform.twitter.com/widgets.js"
              strategy="lazyOnload"
            />
          </p>

          <a
            className="mx-3 text-white bg-yellow sm:mt-0 mt-4 hover:underline"
            href="https://www.buymeacoffee.com/cpleiser"
            target="_blank"
          >
            <span>☕ </span>
            Buy me a coffee
          </a>
        </div>
      </div>
    </footer>
  );
}
