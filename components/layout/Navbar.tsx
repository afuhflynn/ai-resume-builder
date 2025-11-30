import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-background/10 sticky top-0 z-60 backdrop-filter backdrop-blur-md py-4 px-6 shadow-md rounded-lg flex items-center justify-between">
      <Link href="/" className="text-2xl font-semibold">
        Resumi
      </Link>
      <div className="space-x-4">
        <Link href="/login" className="text-secondary/80 hover:text-secondary">
          Login
        </Link>
        <Link href="/signup" className="text-secondary/80 hover:text-secondary">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
