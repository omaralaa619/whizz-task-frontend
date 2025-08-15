import React from "react";

const Tag = ({ tag, color }) => {
  return <p className={color}>#{tag}</p>;
};

export default Tag;
