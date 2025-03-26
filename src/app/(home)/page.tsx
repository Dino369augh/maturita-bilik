'use client';

import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getSessionUserFromCookies = () => {
      // Get all cookies
      const cookies = document.cookie.split('; ');
      
      // Find the session-user-id cookie
      const sessionUserCookie = cookies.find((cookie) => cookie.startsWith('session-user-id='));
      
      if (sessionUserCookie) {
        // Extract the user ID from the cookie
        const userId = sessionUserCookie.split('=')[1];
        
        // Fetch the username from the database using the user ID
        fetch(`/api/get-username?id=${userId}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.username) {
              setUsername(data.username); // Set the username
            } else {
              setUsername(null); // Handle case where username is not found
            }
          })
          .catch((error) => {
            console.error("Error fetching username:", error);
            setUsername(null);
          });
      } else {
        setUsername(null); // No session cookie found
      }
    };

    getSessionUserFromCookies();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to the Home Page</h1>

      {username ? (
        <p>Welcome, <strong>{username}</strong>! You are logged in.</p>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
}