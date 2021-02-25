import React from "react";

export const SearchResultsComponent = ({ data, onSelect }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "35px",
        right: "0",
        width: "275px",
        height: "225px",
        backgroundColor: "white",
        overFlow: "hidden",
      }}
    >
      {data.map((elm) => (
        <div
          key={elm.adp_id}
          style={{ color: "black", padding: 10, cursor: "pointer" }}
          onClick={() => onSelect(elm.adp_id)}
        >
          {`${elm.adp_id} ${elm.firstname} ${elm.lastname}`}
        </div>
      ))}
    </div>
  );
};
