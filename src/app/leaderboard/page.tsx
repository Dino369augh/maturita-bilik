"use client";

import React, { useState, useEffect } from "react";
import { getLeaderboard } from "./leaderboard-action";

interface LeaderboardUser {
  username: string;
  score: number;
}

const LeaderboardPage = () => {
  const [topUsers, setTopUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const result = await getLeaderboard();
        if (result.success && result.topUsers) {
          setTopUsers(result.topUsers);
        } else {
          console.error("Failed to fetch leaderboard:", result.error);
        }
      } catch (err) {
        console.error("Leaderboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <div className="text-center py-8">Loading leaderboard...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-8">🏆 FILIP BILIK KING; 🏆</h1>
      
      <div className="max-w-md mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Leaderboard</h2>
          
          {topUsers.length > 0 ? (
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div 
                  key={user.username} 
                  className={`flex items-center justify-between p-4 rounded-lg ${
                    index === 0 ? "bg-yellow-500 text-gray-900" : 
                    index === 1 ? "bg-gray-300 text-gray-900" : 
                    "bg-amber-700 text-white"
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-xl font-bold mr-4">
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : "🥉"}
                    </span>
                    <span className="font-medium">{user.username}</span>
                  </div>
                  <span className="font-bold">{user.score} points</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center py-4">No leaderboard data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;