import React from "react";
import SearchBar from "../components/SearchBar";

export default function SearchDetail() {
  return (
    <div className="flex flex-col justify-end items-center">
      <div className="fixed top-18 z-50">
        <SearchBar variant="detail" />
      </div>
    </div>
  );
}
