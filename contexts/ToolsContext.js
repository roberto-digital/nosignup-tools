import { createContext, useState, useEffect } from "react";

const ToolsContext = createContext();

const ToolsProvider = ({ children }) => {
  const initialFavourites = [];
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [favourites, setFavourites] = useState(initialFavourites);

  const [pagination, setPagination] = useState({
    limit: 12,
    total: tools?.length,
    start: 0,
    page: 1,
    perPage: 10,
    showPrevButton: false,
    showFirstPageButton: false,
    showNextButton: false,
    showLastPageButton: false,
  });

  useEffect(() => {
    const tools = JSON.parse(localStorage.getItem("tools"));
    const favouriteData =
      JSON.parse(localStorage.getItem("favourites")) || initialFavourites;
    if (tools) {
      setTools(tools);
    }
    if (favourites) {
      setFavourites(favouriteData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tools", JSON.stringify(tools));
  }, [tools]);

  useEffect(() => {
    if (favourites !== initialFavourites) {
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
  }, [favourites]);

  const addFav = (id) => {
    setFavourites([...favourites, id]);
  };

  const removeFav = (id) => {
    setFavourites([...favourites.filter((found) => found !== id)]);
  };

  const [filter, setFilter] = useState({
    textSearch: "",
    categoryFilters: [],
    sortFilter: "",
  });

  const resetToPageOne = () => {
    setPagination({
      ...pagination,
      page: 1,
      start: 0,
      perPage: pagination.limit,
    });
  };

  const handleChange = (e) => {
    const type = e.target.type;
    const value = e.target.name;
    const checked = e.target.checked;

    // If radio button, it's a sort filter
    if (type == "radio") {
      setFilter((prevState) => {
        return {
          ...prevState,
          sortFilter: e.target.id,
        };
      });
      resetToPageOne();

      // If checkbox, it's a category filter
    } else if (type == "checkbox") {
      if (checked) {
        setFilter((prevState) => {
          return {
            ...prevState,
            categoryFilters: [...prevState.categoryFilters.concat(value)],
          };
        });
        resetToPageOne();
      } else {
        setFilter((prevState) => {
          return {
            ...prevState,
            categoryFilters: prevState.categoryFilters.filter(
              (item) => item !== value
            ),
          };
        });
        resetToPageOne();
      }
    }
  };

  // Handle free text search
  const handleSearchQuery = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const trimmedSearch = value.trim().replace(/" "/g, "");
    setFilter((prevState) => {
      return {
        ...prevState,
        textSearch: trimmedSearch,
      };
    });
  };

  const refreshTools = async () => {
    try {
      const res = await fetch("/api/getTools");
      const latestTools = await res.json();
      setTools(latestTools);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilter = (tools, filter) => {
    const { textSearch, categoryFilters, sortFilter } = filter;
    let result = tools;
    if (textSearch) {
      result = result.filter(
        (item) =>
          item.fields.name.toLowerCase().includes(textSearch.toLowerCase()) ||
          item.fields.description
            .toLowerCase()
            .includes(textSearch.toLowerCase())
      );
    }
    if (categoryFilters.length) {
      result = result.filter(
        (item) => categoryFilters.indexOf(item.fields.category) !== -1
      );
    }
    if (sortFilter == "myFavourites-sort") {
      result = result.filter((item) => favourites.indexOf(item.id) !== -1);
    }
    if (sortFilter == "atoz-sort") {
      result = result.sort((a, b) =>
        a.fields.name.localeCompare(b.fields.name)
      );
    }
    if (sortFilter == "topRated-sort") {
      result = result.sort((a, b) => b.fields.rating - a.fields.rating);
    }
    if (sortFilter == "featured-sort") {
      result = result.sort((a, b) => b.fields.featured - a.fields.featured);
    }
    if (sortFilter == "latest-sort") {
      result = tools;
    }
    return result;
  };

  const filteredTools = applyFilter(tools, filter);

  return (
    <ToolsContext.Provider
      value={{
        loading,
        setLoading,
        tools: filteredTools,
        setTools,
        categories,
        setCategories,
        favourites,
        setFavourites,
        addFav,
        removeFav,
        pagination,
        setPagination,
        refreshTools,
        handleSearchQuery,
        handleChange,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};

export { ToolsProvider, ToolsContext };
