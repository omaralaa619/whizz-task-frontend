import Link from "next/link";

const DesktopNavlinks = () => {
  return (
    <div className="hidden md:flex gap-6 text-white font-normal">
      <Link href={"/"} className="text-white">
        <p>HOME</p>
      </Link>

      <Link href={"/posts/your-posts"} className="text-white">
        <p>YOUR POSTS</p>
      </Link>
    </div>
  );
};

export default DesktopNavlinks;
