import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../Utils/Errors";
import { handleSuccess } from "../../Utils/Errors";
// import { Navigate } from "react-router-dom";

export default function SignUpPage() {
  const [SignupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)

    const copySignupInfo = { ...SignupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };
  // console.log(SignupInfo)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = SignupInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "http://localhost:3000/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SignupInfo),
      });
      const data = await response.json();
      const { success, message } = data;
      console.log(data);
      if (response.ok) {
         handleSuccess(message || "Signup successful");
         setTimeout(() => {
           navigate("/login", { replace: true });
         }, 2000);
      } else {
        return handleError(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-zinc-800 mb-6">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            type="text"
            name="name"
            value={SignupInfo.name}
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />

          <input
            onChange={handleChange}
            type="email"
            name="email"
            value={SignupInfo.email}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={SignupInfo.password}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <button
            type="submit"
            className="w-full bg-zinc-800 text-white py-2 rounded-lg font-medium hover:bg-zinc-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link to="/login" className="text-zinc-900 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}
