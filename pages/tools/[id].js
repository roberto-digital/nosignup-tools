import React, { useContext } from "react";
import { ToolsContext } from "../../contexts/ToolsContext";
import { table, minifyRecords } from "../api/utils/Airtable";
import Button from "../../components/Button";
import SimpleCard from "../../components/SimpleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Tool({ toolData }) {
  const { tools } = useContext(ToolsContext);

  const getSameCategoryTools = tools.filter(
    (tool) =>
      tool.fields.category == toolData.fields.category &&
      tool.fields.name != toolData.fields.name
  );

  const RecommendedTools = getSameCategoryTools.slice(0, 8).map((t, index) => {
    const { fields } = t;

    if (fields.approved) {
      return (
        <>
          <SimpleCard
            key={fields.name}
            image={fields.screenshot}
            title={fields.name}
            featured={fields.featured}
            share={false}
            className="mx-auto h-full hover:border-gray-400 transform transition-all duration-200 ease hover:-translate-y-1 shadow-sm"
            html={
              <>
                <h2 className="text-gray-900 text-lg font-black mb-2">
                  {fields.name}
                </h2>
              </>
            }
          />
        </>
      );
    } else {
      return null;
    }
  });

  return (
    <section className="text-gray-700 body-font overflow-hidden  bg-white h-full">
      <Link href="/">
        <a className="underline text-blue-700 hover:text-blue-900">
          Back to results page
        </a>
      </Link>
      <div className="container px-5 pt-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img
            alt={`${toolData.fields.name} Screenshot`}
            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
            src={toolData.fields.screenshot}
          />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {toolData.fields.category}
            </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              {toolData.fields.name}
            </h1>
            <div className="flex mb-4">
              <span className="flex items-center ">
                <div className="flex items-center text-blue-900">
                  {[...Array(toolData.fields.rating)].map((e, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="mr-2" />
                  ))}
                </div>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <a
                  className="ml-2 text-gray-500"
                  href={`https://twitter.com/intent/tweet?text=I%20just%20found%20${toolData.fields.url}%20on%20nosignup.tools`}
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
              </span>
            </div>
            <p className="leading-relaxed">{toolData.fields.description}</p>

            <div className="flex">
              <Button
                className="mt-3"
                size="base"
                text={`Try ${toolData.fields.name}`}
                link={toolData.fields.url}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container px-5 pt-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {RecommendedTools.length ? (
            <h2 className="text-gray-900 text-2xl title-font font-bold">
              Other Recommended {`${toolData.fields.category}`} Tools
            </h2>
          ) : (
            ""
          )}
          <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
            {RecommendedTools}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function getStaticPaths() {
  const tools = await table.select({}).all();
  return {
    paths: tools.map((tool) => {
      const ids = tool.fields.name.toLowerCase().replace(/ /g, "-");
      return {
        params: {
          id: ids,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const toolData = await table
    .select({
      filterByFormula: `(LOWER(name) = "${params.id
        .toLowerCase()
        .replace(/\-/g, " ")}")`,
    })
    .firstPage();
  return {
    props: {
      toolData: minifyRecords(toolData)[0],
    },
  };
}
