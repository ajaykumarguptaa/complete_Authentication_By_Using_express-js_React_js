
import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-600 to-zinc-800 text-white flex flex-col">
      {/* Navbar */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-zinc-800/60 backdrop-blur-md">
        <h1 className="text-2xl font-bold">MyWebsite</h1>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="hover:text-indigo-400">Features</a>
          <a href="#about" className="hover:text-indigo-400">About</a>
          <a href="#contact" className="hover:text-indigo-400">Contact</a>
        </nav>
        <button className="md:hidden px-3 py-2 bg-zinc-700 rounded-lg">☰</button>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to <span className="text-indigo-400">MyWebsite</span>
        </h2>
        <p className="max-w-2xl text-lg md:text-xl text-zinc-200 mb-6">
          A modern responsive homepage built with React and Tailwind CSS v4,
          featuring a sleek zinc gradient theme.
        </p>
        <div className="flex space-x-4">
          <Link to="/signup" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition">
            Get Started
          </Link>
          <Link to="/login" className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 rounded-lg font-medium transition">
            Login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-800/80 text-center py-4 text-sm text-zinc-300">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </footer>
      <Outlet />
    </div>
  );
}
