"use client";

import React from "react";
import { logout } from "./logout-actions";

const LogoutPage = () => {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="p-6 bg-blue rounded-md shadow-md w-full max-w-xs">
        <h1 className="text-2xl font-bold text-center mb-4">
          Are you sure you want to log out?
        </h1>
        <button
          onClick={handleLogout}
          className="input input-bordered w-full max-w-xs text-center bg-red-600 text-white hover:bg-red-700 transition duration-300"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;