import PostEdit from "@/components/PostNewPage/PostEdit";
import React from "react";

const page = ({ params }) => {
  const id = params.pid;
  console.log("slug: ", id);

  return (
    <div>
      <PostEdit id={id} />
    </div>
  );
};

export default page;
