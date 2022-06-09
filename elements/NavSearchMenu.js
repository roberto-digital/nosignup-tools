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
    <nav className="sticky w-full top-0 flex flex-col sm:flex-row sm:h-20 px-6 border-b border-gray-300 bg-purple z-50">
      <div className="h-20 mx-auto w-full flex items-center justify-between sm:h-auto ">
        <a
          href="https://nosignup.tools"
          className="no-underline block text-white font-bold ml-3 text-md xl:text-2xl flex"
        >
          nosignup.tools
        </a>

        <div className="items-center ">
          <Button
            type="outline"
            text="List a tool"
            link="https://tally.so#tally-open=nrjoKN&tally-layout=modal&tally-width=500&tally-emoji-text=👋&tally-emoji-animation=wave&tally-auto-close=3000"
            icon={<FontAwesomeIcon icon={faPlus} />}
          />
        </div>
      </div>
      {router.pathname === "/" && (
        <div className="mt-2 mb-4 sm:mx-0 sm:mb-0 sm:mt-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-1/2 sm:h-full justify-center items-center block sm:flex">
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
    </nav>
  );
}

export default NavSearchMenu;
