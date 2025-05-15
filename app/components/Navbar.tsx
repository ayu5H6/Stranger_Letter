"use client";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen]=useState(false)
  return (
    <nav className="flex justify-between bg-red-400 p-4">
      <div>
        <a href="">SL</a>
      </div>
      <div className="space-x-5 ">
        <a href="">About</a>
        <a href="">Inbox</a>
        {user ? (
          <div className="relative  inline-block">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="px-2 py-1 "
            >
              {user.displayName || user.email}
            </button>
            {open && (
              <div className="absolute right-0 bg-white text-black shadow-md mt-1 z-10 rounded">
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
