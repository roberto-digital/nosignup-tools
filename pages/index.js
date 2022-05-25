import React, { useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Head from "next/head";

import { table, minifyRecords } from "./api/utils/Airtable";
import NavSearchMenu from "../elements/NavSearchMenu";
import SideFilters from "../elements/SideFilters";
import Alert from "../components/Alert";
import SimpleCard from "../components/SimpleCard";
import Footer from "../components/Footer";
import PaginationBoxes from "../components/PaginationBoxes";
import { ToolsContext } from "../contexts/ToolsContext";

function ToolSearch({ initialTools }) {
  const { alerts, tools, setTools, pagination, setPagination, setCategories } =
    useContext(ToolsContext);

  useEffect(() => {
    const initialCategories = initialTools
      .map((tool) => tool.fields.category)
      .filter((value, index, self) => self.indexOf(value) === index);
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
    .map((t) => {
      const { fields } = t;

      if (fields.approved) {
        return (
          <SimpleCard
            key={fields.name}
            image={fields.screenshot}
            className="mx-auto h-full hover:border-gray-400 transform transition-all duration-200 ease hover:-translate-y-1 shadow-sm"
            html={
              <div className="text-sm">
                <span className=" bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
                  {fields.category}
                </span>

                <h3 className="mt-2 font-bold text-base">{fields.name}</h3>
                <p>{fields.description}</p>
                <div className="flex items-center mt-2 text-blue-400">
                  {[...Array(fields.rating)].map((e, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="mr-2" />
                  ))}
                  {fields.rating} out of 5 stars
                </div>
              </div>
            }
            buttonLink={fields.url}
            buttonText={`Try ${fields.name} `}
          />
        );
      } else {
        return null;
      }
    });

  return (
    <div>
      <Head>
        <title>No Signup Tools</title>
      </Head>
      <NavSearchMenu />
      <div className="w-full flex flex-col lg:flex-row lg:px-6">
        <SideFilters />
        <div className="flex-1 lg:pl-12 py-6 px-6 lg:px-0">
          {alerts && (
            <Alert content="No Signup Tools lists free tools that don't require registration." />
          )}
          <div className="mt-12">
            <h1 className="text-4xl text-center font-bold">
              Discover The Best No-Signup Tools <br />
              You Can Use in 10 Seconds
            </h1>
            <h3 className="text-xl text-center font-light mt-4">
              Nosignup.tools is a curated list of free web apps that do not
              require login or signup
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
              {AllTools}
            </div>
          </div>
        </div>
      </div>

      <PaginationBoxes
        numberOfPages={numberOfPages}
        navigateToPage={navigateToPage}
        tools={tools}
      />
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const tools = await table
      .select({ sort: [{ field: "created", direction: "desc" }] })
      .firstPage();
    return {
      props: {
        initialTools: minifyRecords(tools),
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
