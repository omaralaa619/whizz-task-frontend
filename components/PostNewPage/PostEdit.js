"use client";
import { use, useEffect, useState } from "react";
import PostForm from "./PostForm";
import axios from "axios";
import { useRouter } from "next/navigation";

const PostEdit = ({ id }) => {
  const router = useRouter();
  const [post, setPost] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const getTokenFromCookies = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  };

  const submitHandler = async (data) => {
    setSubmitLoading(true);
    const token = getTokenFromCookies();
    if (!token) {
      console.error("No token found in cookies");
      return;
    }

    const formData = new FormData();
    formData.append("post[title]", data.title);
    formData.append("post[body]", data.body);

    if (data.image && data.image.length === 1 && data.image[0]) {
      formData.append("post[image]", data.image[0]);
    }

    const response = await axios.put(
      `http://localhost:3000/posts/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Post updated successfully:", response.data);
    console.log("Form submitted with data:", data);
    setSubmitLoading(false);
    router.push(`/posts/${id}`);
  };

  const fetchPostData = async () => {
    setLoading(true);
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
      setPost(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPostData();
  }, [id]);
  return (
    <div className="text-white py-8 mx-4 md:mx-10 min-h-[100vh]">
      {!loading && (
        <PostForm
          defaultValues={post}
          submitLoading={submitLoading}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
};

export default PostEdit;
