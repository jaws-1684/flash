import React from "react";
import Close from "../../components/Icons/Close";
import { Magnifier } from "../../components/Icons/AppIcons";

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative mb-8 w-full fixed">
      <div className="relative">
        <input
          placeholder="Start a conversation by finding a contact by username"
          className="truncate w-full pl-8 border-0 rounded-full p-2 tracking-tight bg-gray-200/40 dark:color-white dark:placeholder-gray-400 dark:focus-bg-gray-500 dark:bg-gray-500"
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <button className="absolute inset-y-0 start-2">
        <Magnifier className="fill-gray-700" />
      </button>
      {searchTerm && (
        <button
          className="absolute inset-y-0 end-5"
          onClick={() => setSearchTerm("")}
        >
          <Close className="fill-gray-700" />
        </button>
      )}
    </div>
  );
}

export default Search;
