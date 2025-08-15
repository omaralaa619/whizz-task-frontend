"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Tag from "../ui/Tag";
import axios from "axios";
import CommentSection from "./CommentSection";

const PostPageContent = ({ id }) => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const tags = ["javascript", "tech", "rails"];
  const getTokenFromCookies = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  };

  const fetchPost = async () => {
    try {
      const token = getTokenFromCookies();
      if (!token) {
        console.error("No token found in cookies");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/posts/${id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      setPost(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    !loading && (
      <div className="my-10 mx-4 md:mx-10 text-white">
        <div className="flex-1 aspect-[3/1] relative mb-4">
          <Image
            src={post.image_url}
            fill
            alt="post image"
            className="rounded-lg object-cover relative z-10"
          />
        </div>
        <div className="mt-6  m-auto md:w-[70%]">
          <h1 className="text-2xl text-center mb-6">{post.title}</h1>

          <div className="flex justify-between mb-4">
            <div className="flex gap-2 text-sm">
              {tags.map((tag, idx) => {
                const colors = [
                  "text-lime-500",
                  "text-cyan-500",
                  "text-yellow-500",
                ];

                return <Tag key={tag} tag={tag} color={colors[idx]} />;
              })}
            </div>

            <p>12 July 2025</p>
          </div>

          <p>{post.body}</p>
          <CommentSection postId={id} />
        </div>
      </div>
    )
  );
};

export default PostPageContent;
