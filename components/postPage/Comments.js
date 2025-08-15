"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const Comments = ({
  postId,
  fetchComments,
  loading,
  comments,
  setComments,
}) => {
  const currentUserId = localStorage.getItem("userId"); // already saved at login

  const getTokenFromCookies = () => {
    const match = document.cookie.match(new RegExp("(^| )token=([^;]+)"));
    return match ? match[2] : null;
  };

  const deleteComment = async (commentId) => {
    try {
      const token = getTokenFromCookies();
      await axios.delete(
        `http://localhost:3000/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  if (loading) {
    return <p className="text-gray-400">Loading comments...</p>;
  }

  return (
    <div className="mt-8">
      <p className="text-xl font-semibold mb-4">Comments</p>
      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-b border-gray-700 pb-2 flex justify-between items-start"
            >
              <div>
                <p className="text-sm text-gray-300">{comment.user?.email}</p>
                <p className="text-white">{comment.body}</p>
              </div>
              {String(comment.user?.id) === currentUserId && (
                <button
                  onClick={() => deleteComment(comment.id)}
                  className="text-red-500 hover:underline text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
