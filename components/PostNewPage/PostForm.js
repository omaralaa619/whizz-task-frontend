"use client";
import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const PostForm = ({ defaultValues, submitHandler, submitLoading }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { ...defaultValues },
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-6 p-6 border border-gray-300 rounded-lg max-w-xl mx-auto"
    >
      <div>
        <label className="block mb-2 font-medium">Title</label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Body</label>
        <textarea
          {...register("body", { required: true })}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
          rows={6}
        />
      </div>
      <div>
        <label className="block mb-2 font-medium">Image</label>
        <input
          type="file"
          accept="image/*"
          {...register("image")}
          onChange={handleImageChange}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
        />
        {/* Display image: if preview (file picked), show preview; else if defaultValues.image is a string, show URL */}
        {imagePreview ? (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 rounded h-32 object-cover"
          />
        ) : (
          defaultValues?.image_url &&
          typeof defaultValues.image_url === "string" && (
            <img
              src={defaultValues.image_url}
              alt="Current"
              className="mt-2 rounded h-32 object-cover"
            />
          )
        )}
      </div>
      <div>
        <label className="block mb-2 font-medium">Tags (comma separated)</label>
        <input
          type="text"
          {...register("tags")}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
          placeholder="e.g. tech, blog, nextjs"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition-colors flex items-center justify-center"
      >
        {submitLoading ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          <p>Submit</p>
        )}
      </button>
    </form>
  );
};

export default PostForm;
