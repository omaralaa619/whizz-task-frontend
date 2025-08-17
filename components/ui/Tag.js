import React from "react";

const Tag = ({ tag, color }) => {
  return <p className={color}>#{tag.name}</p>;
};

export default Tag;
