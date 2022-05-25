import React from "react";

export default function Footer() {
  return (
    <footer className="p-4 bg-white rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
      <div className="sm:flex sm:items-center sm:justify-between">
        <a href="" className="flex items-center mb-4 sm:mb-0">
          <img
            src="./images/NOSIGNUP.tools.png"
            className="mr-3 h-3"
            alt="Flowbite Logo"
          />
        </a>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
            <a
              href="https://twitter.com/ckpleiser"
              className="mr-4 hover:underline md:mr-6 "
            >
              Follow me on Twitter
            </a>
          </li>
          <li>
            <a
              href="https://airtable.com/shrkB7Vo1eklM96Jq"
              className="mr-4 hover:underline md:mr-6"
            >
              Suggest a tool
            </a>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022{" "}
        <a href="#" className="hover:underline">
          No Signup Tools™
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
