import { ToolsContext } from "../contexts/ToolsContext";
import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

import Button from "../components/Button";

function NavSearchMenu() {
  const { handleSearchQuery } = useContext(ToolsContext);

  const router = useRouter();

  return (
    <div className="sticky top-0 flex flex-col sm:flex-row sm:h-20 px-6 border-b border-gray-300 bg-lightblue z-50">
      <div className="h-20 w-full flex items-center justify-between sm:h-auto ">
        <a
          href="https://nosignup.tools"
          className="no-underline block text-gray-100 font-bold ml-3 text-md xl:text-xl flex"
        >
          <Image src="/nosignup_logo.png" width="150%" height="50%" />
        </a>

        <div className="items-center ">
          <Button
            type="primary"
            text="List a tool"
            link="https://airtable.com/shrkB7Vo1eklM96Jq"
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
      </div>
      {router.pathname === "/" && (
        <div className="w-full mx-auto mt-2 mb-4 sm:mx-0 sm:mb-0 sm:mt-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-1/2 sm:h-full justify-center items-center block sm:flex">
          <form className="relative w-full">
            <input
              type="search"
              className="w-full max-w-full border border-gray-300 rounded-sm pr-4 pl-10 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
              placeholder="Search for tools..."
              onChange={(e) => handleSearchQuery(e)}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-0 ml-4 top-1/2 transform -translate-y-1/2 text-gray-300"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default NavSearchMenu;
