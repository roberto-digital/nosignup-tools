import React from "react";
import Script from "next/script";

export default function Footer() {
  return (
    <footer className="text-gray-900 body-font w-full">
      <div className="bg-purple">
        <div className="py-6 px-6 flex items-center justify-left sm:justify-center sm:flex-row flex-col">
          <a className="flex title-font font-medium items-center justify-center text-gray-100">
            <span className="ml-3 text-xl font-bold">nosignup.tools</span>
          </a>
          <p className="text-sm text-gray-500 sm:mt-0 ml-3 mt-4">
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
        </div>
      </div>
    </footer>
  );
}
