import React from "react";

export const CardGrid = (props) => {
  return (
    <div style={{ marginTop: "0.625rem" }}>
      <div className="row">{props.children}</div>
    </div>
  );
};
