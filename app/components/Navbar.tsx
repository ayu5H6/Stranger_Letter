import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between bg-red-400 p-4">
      <div>
        <a href="">SL</a>
      </div>
      <div className="space-x-5 ">
        <a href="">About</a>
        <a href="">Inbox</a>
        <a href="">User</a>
        <a href="">Login</a>
      </div>
    </nav>
  );
};

export default Navbar;
