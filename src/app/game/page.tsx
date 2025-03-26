'use client';

import React, { useState, useEffect } from "react";
import GameAction from "./GameAction";

interface Champion {
  id: string;
  name: string;
  title: string;
  tags: string[];
  partype: string;
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
}

const GamePage = () => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const championsResponse = await fetch(
          `https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json`
        );
        const championsData = await championsResponse.json();
        setChampions(Object.values(championsData.data));
      } catch (error) {
        console.error("Error fetching champions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChampions();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <GameAction champions={champions} />
    </div>
  );
};

export default GamePage;