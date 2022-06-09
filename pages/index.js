import React, { useEffect, useContext } from "react";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { table, minifyRecords } from "./api/utils/Airtable";
import SideFilters from "../elements/SideFilters";
import SimpleCard from "../components/SimpleCard";
import Loader from "../components/Loader";
import NewsletterForm from "../components/NewsletterForm";
import PaginationBoxes from "../components/PaginationBoxes";
import { ToolsContext } from "../contexts/ToolsContext";

function ToolSearch({ initialTools, initialCategories }) {
  const {
    loading,
    setLoading,
    tools,
    setTools,
    pagination,
    setPagination,
    setCategories,
    addFav,
    favourites,
    setFavourites,
    removeFav,
    filter,
  } = useContext(ToolsContext);

  useEffect(() => {
    setLoading(true);
    setTools(initialTools);
    setCategories(initialCategories);
    navigateToPage(1);
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("tools", JSON.stringify(initialTools));
  }, []);

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
      const { fields, id } = t;

      if (fields.approved) {
        return (
          <>
            <SimpleCard
              key={id}
              image={fields.screenshot}
              title={fields.name}
              url={fields.url}
              share={true}
              featured={fields.featured}
              className="mx-auto h-full hover:border-gray-400 transform transition-all duration-200 ease hover:-translate-y-1 shadow-sm"
              html={
                <>
                  <div>
                    <div className="flex flex-wrap mb-4 items-center justify-between">
                      <span className="flex">
                        <h3 className="text-gray-900 text-lg font-black">
                          {fields.name}
                        </h3>
                      </span>
                      <span className="flex items-center">
                        <a
                          className=" text-gray-900 m-auto mr-1"
                          href={fields.url}
                        >
                          <FontAwesomeIcon
                            icon={faUpRightFromSquare}
                            size="lg"
                            className="mr-2"
                          />
                        </a>
                        {favourites && favourites.includes(t.id) ? (
                          <span>
                            <b onClick={() => removeFav(id)}>
                              <FontAwesomeIcon size="lg" icon={faHeart} />
                            </b>
                          </span>
                        ) : (
                          <span>
                            <b onClick={() => addFav(id)}>
                              <FontAwesomeIcon size="lg" icon={farHeart} />
                            </b>
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className=" text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-purple text-white">
                      {fields.category}
                    </span>
                    <p className="mt-2">{fields.description}</p>
                    <div className="flex items-center mt-2 text-purple">
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
        <title>No Signup Tools</title>
        <meta property="og:title" content="No-Signup Tools" key="title" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        ></meta>

        <meta
          name="description"
          content="Free web apps that don't require registration or login"
        />

        <meta property="og:url" content="https://www.nosignup.tools/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="No-Signup Tools" />
        <meta
          property="og:description"
          content="Free web apps that don't require registration or login"
        />
        <meta property="og:image" content="/images/nosignup_tools.jpeg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="nosignup.tools" />
        <meta property="twitter:url" content="https://www.nosignup.tools/" />
        <meta name="twitter:title" content="No-Signup Tools" />
        <meta
          name="twitter:description"
          content="Free web apps that don't require registration or login"
        />
        <meta name="twitter:image" content="/images/nosignup_tools.jpeg" />
      </Head>
      <div className="flex flex-col lg:flex-row lg:px-6">
        <SideFilters />
        {AllTools.length > 0 ? (
          <div className="flex-1 lg:pl-12 py-6 px-6 lg:px-0">
            <div className="mt-12">
              <h1 className="text-3xl text-gray-900 leading-snug lg:text-5xl text-center font-black">
                Handpicked, no-signup tools
                <br />
                ready to use in 10 seconds.
              </h1>
              <h3 className="text-md text-gray-900 lg:text-2xl text-center font-light mt-4">
                Join thousands of product enthusiasts who get our monthly
                update, for free! <span>📩</span>
              </h3>
              <NewsletterForm />
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
                {AllTools}
                <div className="grid grid-cols-1 mx-auto"></div>
              </div>
            </div>
            <div>
              <PaginationBoxes
                numberOfPages={numberOfPages}
                navigateToPage={navigateToPage}
              />
            </div>
          </div>
        ) : (
          <div className="grid place-items-center h-screen text-center w-full">
            {loading && favourites.length ? (
              <Loader />
            ) : (
              <h3 className="text-3xl">
                Nothing here yet. <span>❤️ </span>some tools to add to your
                favourites.
              </h3>
            )}
          </div>
        )}
      </div>
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
      revalidate: 60,
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
