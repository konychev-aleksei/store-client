import React from "react";
import style from "./style.module.scss";
import C from "../../constants";
import { SearchBar } from "../../UI/SearchBar/SearchBar";

export const Startup = ({ handleSubmit, query, setQuery }) => {
  return (
    <div className={style.wrapper}>
      <video src={C.PREVIEW_LINK} className={style.video} muted autoPlay loop />
      <div className={style.title}>{C.STORE_TITLE}</div>
      <div className={style.searchBar} onSubmit={handleSubmit}>
        <SearchBar
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
};
