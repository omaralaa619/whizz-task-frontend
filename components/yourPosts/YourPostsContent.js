"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PostItem from "../home/PostItem";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const YourPostsContent = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const tags = ["javascript", "tech", "rails"];
  const getTokenFromCookies = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  };

  const deleteHandler = async (id) => {
    setDeleteLoading(true);
    const token = getTokenFromCookies();
    if (!token) {
      console.error("No token found in cookies");
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally refresh posts after delete
      fetchPosts();
    } catch (error) {
      console.error("Delete failed", error);
    }
    setDeleteLoading(false);
  };

  const fetchPosts = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const token = getTokenFromCookies();
      if (!token) {
        console.error("No token found in cookies");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/users/${userId}/posts`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);

      setPosts(response.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    !loading && (
      <div className="text-white mx-6 md:mx-10 mt-10">
        <div className="flex flex-col gap-10">
          {posts.map((post) => (
            <div key={post.id}>
              <PostItem post={post} tags={tags} />

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => deleteHandler(post.id)}
                  className="px-4 py-2 rounded bg-gray-800 text-red-400 hover:bg-gray-700 border border-gray-700 transition-colors shadow flex justify-center items-center"
                >
                  {deleteLoading ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <p>Delete</p>
                  )}
                </button>
                <button
                  onClick={() => router.push(`/posts/edit/${post.id}`)}
                  className="px-4 py-2 rounded bg-gray-800 text-blue-400 hover:bg-gray-700 border border-gray-700 transition-colors shadow"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default YourPostsContent;
