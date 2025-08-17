import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError } from "../../Utils/Errors";
import { handleSuccess } from "../../Utils/Errors";
// import { Navigate } from "react-router-dom";


export default function Login() {

  
  const [LoginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name,value)

    const copyLoginInfo = { ...LoginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };
  // console.log(LoginInfo)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = LoginInfo;
    if (!email || !password) {
      return handleError("All fields are required Check Credentials");
    }
    

    try {
      const url = "http://localhost:3000/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(LoginInfo),
      });
      const data = await response.json();
      const { success, message, jwtToken, name } = data;
      const user = name.toUpperCase();
      // console.log('all data',data);// show all data if needed
      if (response.ok) {
        handleSuccess(response.message || "Login successful");
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("LoggedInUser", user);
        // Redirect to dashboard after successful login
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      } else {
        return handleError(response.message || "Login failed");
      }
    } catch (error) {
      handleError("An error occurred while logging in. Please try again.");
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
            type="email"
            name="email"
            value={LoginInfo.email}
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />

          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={LoginInfo.password}
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
          Don't have an account?{" "}
          <Link to="/signup" className="text-zinc-900 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

