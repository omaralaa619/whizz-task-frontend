"use client";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const PostForm = ({
  defaultValues,
  submitHandler,
  submitLoading,
  tags,
  setTags,
}) => {
  const [tagQuery, setTagQuery] = useState("");
  const [tagLoading, setTagLoading] = useState(false);
  const [tagResults, setTagResults] = useState([]);

  useEffect(() => {
    if (tagQuery.trim() === "") {
      setTagResults([]);
      return;
    }

    setTagLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/tags?q=${encodeURIComponent(tagQuery)}`
        );
        const data = await res.json();
        console.log(data);

        setTagResults(data);
      } catch (err) {
        console.error(err);
      } finally {
        setTagLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [tagQuery]);

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

      {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

      <div>
        <label className="block mb-2 font-medium">Tags</label>
        <input
          type="text"
          value={tagQuery}
          onChange={(e) => setTagQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-transparent"
          placeholder="Search for tags..."
        />

        {tagLoading && <p className="text-gray-500">Loading...</p>}
        {tagResults.length > 0 && (
          <ul className="border rounded mt-4 bg-neutral-800  max-h-40 overflow-y-auto">
            {tagResults.map((tag) => (
              <li
                key={tag.id}
                className="px-3 py-1 hover:bg-neutral-700 cursor-pointer"
                onClick={() => {
                  setTagQuery("");
                  setTags((prev) => {
                    if (prev.some((t) => t.id === tag.id)) return prev;
                    return [...prev, tag];
                  });
                  console.log(tags);
                }}
              >
                {tag.name}
              </li>
            ))}
          </ul>
        )}
        {tags.length > 0 && (
          <div className="border p-2 rounded flex flex-wrap gap-2 mb-2 mt-4">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center bg-neutral-800 px-3 py-1 rounded text-white relative"
              >
                <span>{tag.name}</span>
                <button
                  type="button"
                  className="ml-2 text-xs text-gray-400 hover:text-red-400 font-bold px-1 rounded"
                  onClick={() =>
                    setTags((prev) => prev.filter((t) => t.id !== tag.id))
                  }
                  aria-label={`Remove ${tag.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* /////////////////////////////////////////////////////////////////////////////////////////////// */}

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
