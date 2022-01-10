import React from "react";
import style from "./style.module.scss";
import C from "../../constants.js";
import SearchIcon from "@mui/icons-material/Search";

export const SearchBar = ({ query, setQuery, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className={style.bar}>
      <SearchIcon className={style.icon} />
      <input
        type="search"
        placeholder={C.SEARCH_PLACEHOLDER}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
