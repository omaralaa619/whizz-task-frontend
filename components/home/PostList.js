import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, tags }) => {
  return (
    <div className="grid grid-cols-1 mb-20 md:grid-cols-3 gap-10">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} tags={tags} />
      ))}
    </div>
  );
};

export default PostList;
