"use client";
import { useAuth } from "../context/AuthContext";
import { useState,useEffect,useRef } from "react";
import Link from "next/link";
const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen]=useState(false);
  const buttonRef=useRef<HTMLButtonElement>(null);
  const menuRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const handleClickOutside=(event:MouseEvent)=>{
      if(menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ){
       setOpen(false);
      }
    }
    document.addEventListener("mousedown",handleClickOutside);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutside)
    }
  },[])
  return (
    <nav className="flex justify-between bg-primary p-4 text-white text-xl">
      <div>
        <a href="">SL</a>
      </div>
      <div className="space-x-5 ">
        <Link href="/#about">About</Link>
        <a href="/inbox">Inbox</a>
        {user ? (
          <div className="relative  inline-block">
            <button
              ref={buttonRef}
              onClick={() => setOpen((prev) => !prev)}
              className="px-2 py-1 "
            >
              {user.displayName || user.email}
            </button>
            {open && (
              <div
                className="absolute right-0 bg-white text-black shadow-md mt-1 z-10 rounded"
                ref={menuRef}
              >
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
