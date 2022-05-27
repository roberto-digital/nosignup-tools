import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { table, minifyRecords } from "./api/utils/Airtable";
import SideFilters from "../elements/SideFilters";
import Alert from "../components/Alert";
import SimpleCard from "../components/SimpleCard";
import PaginationBoxes from "../components/PaginationBoxes";
import { ToolsContext } from "../contexts/ToolsContext";

function ToolSearch({ initialTools, initialCategories }) {
  const {
    alerts,
    loading,
    setLoading,
    tools,
    setTools,
    pagination,
    setPagination,
    setCategories,
  } = useContext(ToolsContext);

  useEffect(() => {
    setTools(initialTools);
    setCategories(initialCategories);
    navigateToPage(1);
  }, [tools]);

  const numberOfPages = Math.ceil(tools.length / pagination.limit);

  const navigateToPage = (pageNumber) => {
    setPagination({
      ...pagination,
      page: pageNumber,
      start: (pageNumber - 1) * pagination.limit,
      perPage: pageNumber * pagination.limit,
    });
  };

  const AllTools = tools
    .slice(pagination.start, pagination.perPage)
    .map((t, index) => {
      const { fields } = t;

      if (fields.approved) {
        return (
          <>
            <SimpleCard
              key={fields.name}
              image={fields.screenshot}
              title={fields.name}
              featured={fields.featured}
              className="mx-auto h-full hover:border-gray-400 transform transition-all duration-200 ease hover:-translate-y-1 shadow-sm"
              html={
                <>
                  <h2 className="text-gray-900 text-lg font-black mb-2">
                    {fields.name}
                  </h2>
                  <div className="text-sm">
                    <span className=" bg-gray-100 text-gray-900 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-gray-900">
                      {fields.category}
                    </span>
                    <p className="mt-2">{fields.description}</p>
                    <div className="flex items-center mt-2 text-gray-900">
                      {[...Array(fields.rating)].map((e, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className="mr-2"
                        />
                      ))}
                    </div>
                  </div>
                </>
              }
              buttonLink={fields.url}
              buttonText={`Try ${fields.name} `}
            />
          </>
        );
      } else {
        return null;
      }
    });

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:px-6">
        <SideFilters />
        <div className="flex-1 lg:pl-12 py-6 px-6 lg:px-0">
          {alerts && (
            <Alert content="No Signup Tools lists free tools that don't require registration." />
          )}
          <div className="mt-12">
            <h1 className="text-3xl text-gray-900 leading-snug lg:text-5xl text-center font-black">
              Discover The Best No-Signup Tools <br />
              You Can Use in 10 Seconds{" "}
              <span className="italic underline">or less</span>
            </h1>
            <h3 className="text-md text-gray-900 lg:text-2xl text-center font-light mt-4">
              Nosignup.tools is a curated list of free web apps that don&apos;t
              require registration or login
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
              {AllTools}
              <div className="grid grid-cols-1 mx-auto">
                <a
                  href="https://appsumo.8odi.net/c/3467082/1358420/7443"
                  target="_top"
                  id="1358420"
                >
                  <img
                    src="//a.impactradius-go.com/display-ad/7443-1358420"
                    border="0"
                    alt=""
                    width="300"
                    height="250"
                    className="mb-4"
                  />
                </a>
                <img
                  height="0"
                  width="0"
                  src="https://appsumo.8odi.net/i/3467082/1358420/7443"
                  border="0"
                />
                <a
                  href="https://appsumo.8odi.net/c/3467082/1357601/7443"
                  target="_top"
                  id="1357601"
                >
                  <img
                    src="//a.impactradius-go.com/display-ad/7443-1357601"
                    border="0"
                    alt=""
                    width="300"
                    height="250"
                  />
                </a>
                <img
                  height="0"
                  width="0"
                  src="https://appsumo.8odi.net/i/3467082/1357601/7443"
                  border="0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaginationBoxes
        numberOfPages={numberOfPages}
        navigateToPage={navigateToPage}
      />
    </>
  );
}

export async function getStaticProps() {
  try {
    const tools = await table
      .select({ sort: [{ field: "featured", direction: "desc" }] })
      .firstPage();
    const initialCategories = tools
      .map((tool) => tool.fields.category)
      .filter((value, index, self) => self.indexOf(value) === index);
    return {
      props: {
        initialTools: minifyRecords(tools),
        initialCategories,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      props: {
        err: "Something went wrong",
      },
    };
  }
}

export default ToolSearch;
