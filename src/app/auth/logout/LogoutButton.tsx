"use client";

import { logout } from "./logout-actions";

export function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <button className="btn btn-sm" onClick={handleLogout}>
      Logout
    </button>
  );
}