import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
type SearchBarProps = {
  text: string;
};
export default function SearchBar(props: SearchBarProps) {
  return (
    <div className="position-relative">
      <input
        className="form-control border rounded-pill"
        type="text"
        placeholder={props.text}
        id="example-search-input"
        style={{ paddingLeft: "calc(20% + 0.5rem)" }}
      />
      <span
        className="position-absolute top-50 start-0 translate-middle-y px-2"
        style={{ width: "20%" }}
      >
        <FontAwesomeIcon icon={faSearch} />
      </span>
    </div>
  );
}
