import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faSlidersH,
} from "@fortawesome/free-solid-svg-icons";
import { ToolsContext } from "../contexts/ToolsContext";

import FormGroup from "../components/FormGroup";
import RadioGroup from "../components/RadioGroup";
import CheckboxGroup from "../components/CheckboxGroup";

function SideFilters() {
  const { categories } = useContext(ToolsContext);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(true);
  const [categoryOpen, setCategoryOpen] = useState(true);
  const CategoryChecks = categories.map((c) => (
    <FormGroup>
      <CheckboxGroup key={c} label={c} name={c} />
    </FormGroup>
  ));
  return (
    <div className="w-full h-full lg:w-56 relative">
      <div
        className="py-3 bg-white w-full flex items-center justify-center lg:hidden cursor-pointer font-bold"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        Change Filters{" "}
        <FontAwesomeIcon icon={faSlidersH} className="text-xl ml-2" />
      </div>
      <div
        className={`${
          filtersOpen ? "flex" : "hidden"
        } absolute left-0 px-6 lg:px-auto bg-white w-full lg:w-auto z-30 mt-10 lg:mt-0 lg:sticky top-0 pt-6 pb-24 lg:flex flex-col lg:max-h-screen`}
      >
        <div className="flex-1">
          <div className="border-b border-gray-300 py-6">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setSortOpen(!sortOpen)}
            >
              <h5 className="text-sm font-bold">Sort</h5>
              <FontAwesomeIcon
                icon={sortOpen ? faChevronUp : faChevronDown}
                className="text-gray-400 text-base"
              />
            </div>
            {sortOpen && (
              <FormGroup>
                <RadioGroup
                  name="sort"
                  radios={[
                    {
                      value: "myFavourites",
                      label: "My Favourites",
                    },
                    {
                      value: "featured",
                      label: "Staff Picks",
                      checked: true,
                    },
                    {
                      value: "topRated",
                      label: "Top Rated",
                    },
                    {
                      value: "atoz",
                      label: "A to Z",
                    },
                  ]}
                />
              </FormGroup>
            )}
          </div>
          <div className="border-b border-gray-300 py-6 heigh">
            <div
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setCategoryOpen(!categoryOpen)}
            >
              <h5 className="text-sm font-bold">Category</h5>
              <FontAwesomeIcon
                icon={categoryOpen ? faChevronUp : faChevronDown}
                className="text-gray-400 text-base"
              />
            </div>
            {categoryOpen && CategoryChecks}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideFilters;
