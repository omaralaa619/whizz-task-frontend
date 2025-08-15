"use client";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useState } from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: { name: "", email: "", password: "", image: "" },
  });

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/users", {
        user: {
          name: data.name,
          email: data.email,
          password: data.password,
          image:
            "https://www.gravatar.com/avatar/" + data.email + "?d=identicon",
        },
      });

      console.log("success");
      router.push("/login");
    } catch (e) {
      setError(e.response?.data?.errors[0] || "An error occurred");

      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[100vh] my-8 text-white">
      <div className="border border-gray-600 p-6 rounded-lg shadow-md min-w-[300px]">
        <div className="border-b border-gray-600 pb-4 mb-4 text-center flex flex-col items-center">
          <Image src={"/tech-logo.png"} width={100} height={100} alt="logo" />

          <p className="text-xs text-gray-500">
            Signup to see all blog posts & more.
          </p>
        </div>

        <form onSubmit={handleSubmit(submitHandler)}>
          {error && (
            <div className="bg-red-100 text-red-700 p-2 rounded mb-4 max-w-[250px]">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-3 py-2 border border-gray-600 rounded bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-600 rounded bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-600 rounded bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition-colors mt-8 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <p>Sign up</p>
            )}
          </button>
        </form>
      </div>
      <div className="border border-gray-600 p-6 rounded-lg shadow-md min-w-[300px] text-center">
        <p>Have an account?</p>

        <Link href={"/login"} className="text-blue-800 hover:underline text-sm">
          <p>Login</p>
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
