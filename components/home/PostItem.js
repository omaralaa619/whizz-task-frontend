import Image from "next/image";
import Tag from "../ui/Tag";
import Link from "next/link";

const PostItem = ({ post }) => {
  const date = new Date(post.created_at);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="flex flex-col  ">
        <div className="flex-1 aspect-[2/1] relative mb-4">
          <Image
            src={"/post-item.jpg"}
            fill
            alt="post image"
            className="rounded-lg object-cover relative z-10"
          />
        </div>

        <div className="flex-1 flex flex-col gap-2  ">
          <p className="text-2xl mb md:text-2xl ">{post.title}</p>
          <p className="text-sm">{formattedDate}</p>
          <div className="flex gap-2 text-sm">
            {post.tags.slice(0, 3).map((tag, idx) => {
              const colors = [
                "text-lime-500",
                "text-cyan-500",
                "text-yellow-500",
              ];
              return (
                <Tag key={tag} tag={tag} color={colors[idx % colors.length]} />
              );
            })}
          </div>
          <p className="line-clamp-3 text-white/80">{post.body}</p>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
