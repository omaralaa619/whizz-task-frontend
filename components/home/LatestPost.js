import Image from "next/image";
import React from "react";
import Tag from "../ui/Tag";
import Link from "next/link";

const LatestPost = ({ post, placement, tags }) => {
  const date = new Date(post.created_at);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="mb-10">
        <p className="text-2xl font-bold mb-8 md:text-4xl">
          {placement ? "LATEST" : "JAVASCRIPT"}
        </p>

        <div
          className={`flex flex-col gap-4 md:items-center ${
            !placement ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          <div className="flex-1 aspect-[2/1] relative mb-4">
            <div className="absolute inset-0 z-0">
              <Image
                src={post.image_url}
                fill
                alt="post image"
                className="object-cover blur-2xl opacity-40 translate-x-16"
                draggable={false}
                priority
              />
            </div>

            <Image
              src={post.image_url}
              fill
              alt="post image"
              className="rounded-lg object-cover relative z-10"
            />
          </div>

          <div className="flex-1 flex flex-col gap-2 md:gap-4 ">
            <p className="text-2xl mb md:text-4xl md:mb-6">{post.title}</p>
            <p className="text-sm">{formattedDate}</p>
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
            <p className="line-clamp-3 text-white/80">{post.body}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LatestPost;
