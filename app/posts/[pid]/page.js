import PostPageContent from "@/components/postPage/PostPageContent";
import Image from "next/image";
import React from "react";

const page = ({ params }) => {
  const id = params.pid;

  return (
    <div className="min-h-[100vh] m-auto max-w-[1300px]">
      <PostPageContent id={id} />
    </div>
  );
};

export default page;
