import React, { useContext } from "react";
import { ToolsContext } from "../../contexts/ToolsContext";
import { table, minifyRecords } from "../api/utils/Airtable";
import Button from "../../components/Button";
import SimpleCard from "../../components/SimpleCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import Link from "next/link";
import Head from "next/head";
import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function Tool({ toolData }) {
  const { tools, favourites, addFav, removeFav } = useContext(ToolsContext);

  const getSameCategoryTools = tools?.filter(
    (tool) =>
      tool.fields.category == toolData.fields.category &&
      tool.fields.name != toolData.fields.name
  );

  const RecommendedTools = getSameCategoryTools.slice(0, 8).map((t, index) => {
    const { fields, id } = t;

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
    <>
      <Head>
        <title>{toolData.fields.name} - No-Signup Tools</title>
        <meta
          property="og:title"
          content={`${toolData.fields.name} - No-Signup Tools`}
          key="title"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>

        <meta name="description" content={`${toolData.fields.description}`} />

        <meta
          property="og:url"
          content={`https://nosignup.tools/tools/${toolData.fields.name
            .toLowerCase()
            .replace(/ /g, "-")}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content={`${toolData.fields.description}`}
        />
        <meta property="og:image" content={`${toolData.fields.screenshot}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="nosignup.tools" />
        <meta
          property="twitter:url"
          content={`https://nosignup.tools/tools/${toolData.fields.name
            .toLowerCase()
            .replace(/ /g, "-")}`}
        />
        <meta
          name="twitter:title"
          content={`${toolData.fields.name} - No-Signup Tools`}
        />
        <meta
          name="twitter:description"
          content={`${toolData.fields.description}`}
        />
        <meta name="twitter:image" content={`${toolData.fields.screenshot}`} />
      </Head>
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
                  <a className=" text-gray-900 mr-1" href={toolData.fields.url}>
                    <FontAwesomeIcon
                      icon={faUpRightFromSquare}
                      className="mr-2"
                      size="xl"
                    />
                  </a>
                  <a
                    className=" text-gray-900"
                    href={`https://twitter.com/intent/tweet?text=I%20just%20found%20${toolData.fields.url}%20on%20nosignup.tools`}
                  >
                    <FontAwesomeIcon
                      icon={faTwitter}
                      size="xl"
                      className="mr-2"
                    />
                  </a>
                  <a
                    className=" text-gray-900"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${toolData.fields.url}`}
                  >
                    <FontAwesomeIcon
                      icon={faFacebook}
                      size="xl"
                      className="mr-2"
                    />
                  </a>
                  <a
                    className=" text-gray-900"
                    href={`https://api.whatsapp.com/send?text=I found ${toolData.fields.url} on nosignup.tools via %0ahttps://www.nosignup.tools`}
                  >
                    <FontAwesomeIcon
                      icon={faWhatsapp}
                      size="xl"
                      className="mr-2"
                    />
                  </a>
                  {favourites && favourites.includes(toolData.id) ? (
                    <span style={{ color: "red" }}>
                      <b onClick={() => removeFav(toolData.id)}>
                        <FontAwesomeIcon size="xl" icon={faHeart} />
                      </b>
                    </span>
                  ) : (
                    <span>
                      <b onClick={() => addFav(toolData.id)}>
                        <FontAwesomeIcon size="xl" icon={farHeart} />
                      </b>
                    </span>
                  )}
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
    </>
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
    revalidate: 60,
  };
}
