import { createContext, useState, useEffect } from "react";

const ToolsContext = createContext();

const ToolsProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 10,
    total: tools.length,
    start: 0,
    page: 1,
    perPage: 10,
    showPrevButton: false,
    showFirstPageButton: false,
    showNextButton: false,
    showLastPageButton: false,
  });

  const [filter, setFilter] = useState({
    textSearch: "",
    categoryFilters: [],
    sortFilter: "",
  });
  const [alerts, setAlerts] = useState("");

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

      // If checkbox, it's a category filter
    } else if (type == "checkbox") {
      if (checked) {
        setFilter((prevState) => {
          return {
            ...prevState,
            categoryFilters: [...prevState.categoryFilters.concat(value)],
          };
        });
      } else {
        setFilter((prevState) => {
          return {
            ...prevState,
            categoryFilters: prevState.categoryFilters.filter(
              (item) => item !== value
            ),
          };
        });
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
    if (sortFilter == "atoz-sort") {
      result = result.sort((a, b) =>
        a.fields.name.localeCompare(b.fields.name)
      );
    }
    if (sortFilter == "topRated-sort") {
      result = result.sort((a, b) => b.fields.rating - a.fields.rating);
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
        tools: filteredTools,
        setTools,
        categories,
        setCategories,
        pagination,
        setPagination,
        refreshTools,
        handleSearchQuery,
        handleChange,
        alerts,
      }}
    >
      {children}
    </ToolsContext.Provider>
  );
};

export { ToolsProvider, ToolsContext };
