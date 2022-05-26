import React from "react";

export default function Footer() {
  return (
    <footer className="px-4 py-8 dark:bg-blue-900 dark:text-gray-200">
      <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
        <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
          <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
            <li>
              <a rel="noopener noreferrer" href="#">
                Terms of Use
              </a>
            </li>
            <li>
              <a rel="noopener noreferrer" href="#">
                Privacy
              </a>
            </li>
          </ul>
        </div>
        <ul className="flex flex-wrap pl-3 space-x-4 justify-right sm:space-x-8">
          <li>
            <a
              rel="noopener noreferrer"
              href="https://airtable.com/shrkB7Vo1eklM96Jq"
            >
              Submit
            </a>
          </li>
          <li>
            <a rel="noopener noreferrer" href="https://twitter.com/ckpleiser">
              Follow me on Twitter
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
