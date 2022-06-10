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
    <nav className="w-full top-0 bg-purple z-50">
      <div className="container mx-auto sticky flex flex-col w-full align-center">
        <div className="w-auto block flex items-center justify-between md:h-20 ">
          <a
            href="https://nosignup.tools"
            className="no-underline text-white font-bold ml-3 text-xl xl:text-2xl"
          >
            nosignup.tools
          </a>
          {router.pathname === "/" && (
            <div className="mt-2 hidden lg:flex mb-4 sm:mx-0 sm:mb-0 sm:mt-0 sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-1/2 sm:h-full justify-center items-center block ">
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
          <div className="w-auto">
            <Button
              type="outline"
              text="List a tool"
              link="https://tally.so#tally-open=nrjoKN&tally-layout=modal&tally-width=500&tally-emoji-text=👋&tally-emoji-animation=wave&tally-auto-close=3000"
              icon={<FontAwesomeIcon icon={faPlus} />}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavSearchMenu;
