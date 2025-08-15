"use client";

import axios from "axios";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const { register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/users/sign_in", {
        user: {
          email: data.email,
          password: data.password,
        },
      });
      const token = response.headers["authorization"]?.split(" ")[1];
      localStorage.setItem("userId", response.data.user.id);
      if (token) {
        localStorage.setItem("jwtToken", token);
        document.cookie = `token=${token}; path=/; max-age=${
          60 * 60
        }; SameSite=Strict`;
      } else {
        console.error("No token found in response");
      }
      console.log("token", token);

      router.push("/");
    } catch (e) {
      console.log(e);

      setError(e.response?.data?.error || "An error occurred");

      setLoading(false);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[100vh] my-8 text-white">
      <div className="border border-gray-300 p-6 rounded-lg shadow-md min-w-[300px]">
        <div className="border-b border-gray-300 pb-4 mb-4 text-center flex flex-col items-center">
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
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded bg-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded  bg-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-900 transition-colors mt-8 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : <p>Login</p>}
          </button>
        </form>
      </div>
      <div className="border border-gray-300 p-6 rounded-lg shadow-md min-w-[300px] text-center">
        <p>Don't have an account?</p>

        <Link
          href={"/signup"}
          className="text-blue-800 hover:underline text-sm"
        >
          <p>Sign up</p>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
