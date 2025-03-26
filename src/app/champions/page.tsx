// app/champions/page.tsx
'use client';
import React, { useState, useEffect } from "react";
import { getChampionRegion, getChampionRace } from "../../lib/championData";

interface Champion {
  id: string;
  name: string;
  title: string;
  tags: string[];
  race: string;
  region: string;
  partype: string;
  image: { full: string };
}

export default function ChampionsPage() {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const res = await fetch('https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json');
        const { data } = await res.json();
    
        const champs = Object.values(data).map((champ: any) => ({
          ...champ,
          race: getChampionRace(champ.id),
          region: getChampionRegion(champ.id),
        }));
        
        setChampions(champs);
      } catch (error) {
        console.error("Error fetching champions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChampions();
  }, []);

  const filteredChampions = champions.filter(champ => 
    champ.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <div className="text-xl">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">LoL Champions</h1>
        
        <input
          type="text"
          placeholder="Search champions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 mb-8 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredChampions.map(champ => (
            <div key={champ.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-700 transition-colors">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champ.image.full}`}
                alt={champ.name}
                className="w-full h-auto"
                loading="lazy"
              />
              <div className="p-3">
                <h2 className="font-bold text-lg">{champ.name}</h2>
                <p className="text-sm text-gray-400 italic">{champ.title}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {champ.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-900 text-xs rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="mt-2 text-xs space-y-1">
            
                  <p><span className="font-semibold">Resource:</span> {champ.partype || "None"}</p>
                  <p><span className="font-semibold">Region:</span> {champ.region}</p>
                  <p><span className="font-semibold">Race:</span> {champ.race}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!filteredChampions.length && (
          <div className="text-center py-10">
            <p className="text-xl">No champions found</p>
          </div>
        )}
      </div>
    </div>
  );
}