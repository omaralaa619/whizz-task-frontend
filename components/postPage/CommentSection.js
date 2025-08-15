import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import Comments from "./Comments";
import { useRouter } from "next/navigation";

const CommentSection = ({ postId }) => {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  const getTokenFromCookies = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getTokenFromCookies();

      const res = await axios.post(
        `http://localhost:3000/posts/${postId}/comments`,
        {
          comment: { body },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Created comment:", res.data);

      setBody(""); // clear the textarea
      fetchComments();
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/posts/${postId}/comments`
      );
      setComments(res.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setCommentsLoading(false);
    }
  };
  return (
    <div className="mt-10">
      <Comments
        postId={postId}
        fetchComments={fetchComments}
        loading={commentsLoading}
        comments={comments}
        setComments={setComments}
      />
      <p className="text-2xl font-semibold mt-6">Leave a comment</p>
      <form className="mt-6 flex flex-col gap-4 " onSubmit={handleSubmit}>
        <textarea
          className="border border-gray-300 rounded px-3 py-2 bg-transparent text-white"
          rows={4}
          placeholder="Your message..."
          required
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors flex justify-center items-center"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : <p>Submit</p>}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
