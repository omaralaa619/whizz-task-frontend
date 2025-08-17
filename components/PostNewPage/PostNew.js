"use client";
import { useState } from "react";
import PostForm from "./PostForm";
import axios from "axios";
import { set } from "react-hook-form";
import { useRouter } from "next/navigation";

const PostNew = () => {
  const router = useRouter();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const submitHandler = async (data) => {
    setSubmitLoading(true);
    console.log(data);
    const getTokenFromCookies = () => {
      const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
      return match ? match[2] : null;
    };
    try {
      const token = getTokenFromCookies();
      if (!token) {
        console.error("No token found in cookies");
        return;
      }
      console.log("token: ", token);

      const formData = new FormData();
      formData.append("post[title]", data.title);
      formData.append("post[body]", data.body);

      if (tags && tags.length > 0) {
        tags.forEach((tag, idx) => {
          formData.append(`post[tag_ids][]`, tag.id);
        });
      }

      if (data.image && data.image[0]) {
        formData.append("post[image]", data.image[0]);
      }

      const response = await axios.post(
        "http://localhost:3000/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Post created successfully:", response.data);
      router.push(`/posts/${response.data.id}`);
    } catch (error) {
      console.log(error);
      setSubmitLoading(false);
    }

    setSubmitLoading(false);
  };
  return (
    <div className="text-white py-8 mx-4 md:mx-10 min-h-[100vh]">
      <PostForm
        submitHandler={submitHandler}
        submitLoading={submitLoading}
        tags={tags}
        setTags={setTags}
      />
    </div>
  );
};

export default PostNew;
