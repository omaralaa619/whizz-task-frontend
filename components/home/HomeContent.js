"use client";

import { useEffect, useState } from "react";
import LatestPost from "./LatestPost";
import PostList from "./PostList";
import axios from "axios";

const HomeContent = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTokenFromCookies = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  };

  const fetchPosts = async () => {
    try {
      const token = getTokenFromCookies();
      if (!token) {
        console.error("No token found in cookies");
        return;
      }

      const response = await axios.get(
        `http://localhost:3000/posts`,

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
      <div className="text-white py-8 mx-4 md:mx-10">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
            <p className="text-2xl font-bold">No posts yet.</p>
            <a
              href="/posts/new"
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Create your first post
            </a>
          </div>
        ) : (
          <>
            {posts[0] && (
              <div>
                <LatestPost post={posts[0]} placement={true} />
              </div>
            )}
            <div>
              <PostList posts={posts.length > 1 ? posts.slice(1, 4) : []} />
            </div>
            {posts[4] && (
              <div>
                <LatestPost post={posts[4]} placement={false} />
              </div>
            )}
            <div>
              <PostList posts={posts.length > 4 ? posts.slice(4) : []} />
            </div>
          </>
        )}
      </div>
    )
  );
};

export default HomeContent;
