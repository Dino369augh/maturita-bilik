"use client";
import React, { useState, useEffect } from "react";
import { getChampionRegion, getChampionRace } from "../../lib/championData";

interface Champion {
  id: string;
  name: string;
  tags: string[];
  partype: string;
  image: { full: string };
}

const femaleChampions = new Set([
  "Ahri", "Akali", "Annie", "Ashe", "Caitlyn", "Camille", "Diana",
  "Elise", "Evelynn", "Fiora", "Irelia", "Janna", "Jinx", "Kai'Sa",
  "Karma", "Katarina", "Kayle", "LeBlanc", "Leona", "Lillia",
  "Lissandra", "Lulu", "Lux", "Miss Fortune", "Morgana", "Nami",
  "Neeko", "Nidalee", "Orianna", "Poppy", "Qiyana", "Rell",
  "Renata Glasc", "Riven", "Samira", "Senna", "Seraphine", "Shyvana",
  "Sivir", "Sona", "Soraka", "Syndra", "Taliyah", "Tristana",
  "Vayne", "Vi", "Xayah", "Yuumi", "Zoe", "Zyra"
]);

export default function GameAction({ champions }: { champions: Champion[] }) {
  const [randomChampion, setRandomChampion] = useState<Champion & { region: string; race: string } | null>(null);
  const [input, setInput] = useState("");
  const [guesses, setGuesses] = useState<{champion: Champion; comparison: string}[]>([]);
  const [score, setScore] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showVictory, setShowVictory] = useState(false);

  useEffect(() => {
    resetGame();
  }, [champions]);

  const resetGame = () => {
    const newChamp = champions[Math.floor(Math.random() * champions.length)];
    const normalizedName = newChamp.name.replace(/[ '\-.]/g, "");
    
    console.log("Champion to guess:", newChamp.name);
    
    setRandomChampion({
      ...newChamp,
      region: getChampionRegion(normalizedName),
      race: getChampionRace(normalizedName)
    });
    setInput("");
    setGuesses([]);
  };

  const getComparisonResult = (foundChampion: Champion) => {
    if (!randomChampion) return "";
    
    const normalizedName = foundChampion.name.replace(/[ '\-.]/g, "");
    const foundRegion = getChampionRegion(normalizedName);
    const foundRace = getChampionRace(normalizedName);
    const foundGender = femaleChampions.has(foundChampion.name) ? "Female" : "Male";
    const randomGender = femaleChampions.has(randomChampion.name) ? "Female" : "Male";

    const exactRoleMatches = foundChampion.tags.filter(tag => 
      randomChampion.tags.includes(tag)
    );
    const partialRoleMatches = foundChampion.tags.some(tag => 
      randomChampion.tags.includes(tag)
    );
    
    const rolesComparison = foundChampion.tags.join(", ") + 
      (exactRoleMatches.length > 0 
        ? ` (${exactRoleMatches.map(() => "✅").join("")})` 
        : partialRoleMatches 
          ? " (🟠)" 
          : " (❌)");

    const resourceMatch = foundChampion.partype === randomChampion.partype;
    const resourceComparison = (foundChampion.partype || "None") + 
      (resourceMatch ? " (✅)" : " (❌)");

    return `
      Gender: ${foundGender} (${foundGender === randomGender ? "✅" : "❌"})
      Roles: ${rolesComparison}
      Resource: ${resourceComparison}
      Region: ${foundRegion} (${foundRegion === randomChampion.region ? "✅" : "❌"})
      Race: ${foundRace} (${foundRace === randomChampion.race ? "✅" : "❌"})
    `;
  };

  const handleGuess = () => {
    if (!input || !randomChampion) return;

    const guessedChamp = champions.find(c => c.name.toLowerCase() === input.toLowerCase());
    if (!guessedChamp) return;

    const comparison = getComparisonResult(guessedChamp);
    setGuesses(prev => [{ champion: guessedChamp, comparison }, ...prev].slice(0, 5));

    if (guessedChamp.name === randomChampion.name) {
      const newScore = score + 1;
      setScore(newScore);
      setShowVictory(true);
      setTimeout(() => {
        setShowVictory(false);
        resetGame();
      }, 1500);
    } else {
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {showVictory && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-green-600 text-white p-6 rounded-lg text-center animate-pulse">
            <h2 className="text-2xl font-bold">VICTORY!</h2>
            <p>+1 Point! Score: {score}</p>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4 text-center">Guess the Champion</h1>
      
      <div className="max-w-md mx-auto">
        <div className="relative mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowSuggestions(e.target.value.length > 0);
            }}
            onKeyDown={(e) => e.key === "Enter" && handleGuess()}
            placeholder="Type a champion name..."
            className="w-full p-3 rounded-lg bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {showSuggestions && (
            <ul className="absolute z-10 mt-1 w-full bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto">
              {champions
                .filter(c => c.name.toLowerCase().includes(input.toLowerCase()))
                .map(champion => (
                  <li
                    key={champion.id}
                    onClick={() => {
                      setInput(champion.name);
                      setShowSuggestions(false);
                    }}
                    className="p-2 hover:bg-gray-600 cursor-pointer flex items-center"
                  >
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${champion.image.full}`} 
                      className="w-8 h-8 mr-2 rounded-full" 
                      alt="" 
                    />
                    {champion.name}
                  </li>
                ))
              }
            </ul>
          )}
        </div>

        <div className="flex gap-2 mb-6">
          <button 
            onClick={handleGuess}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex-1 transition-colors"
          >
            Submit Guess
          </button>
          <button 
            onClick={resetGame}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded transition-colors"
          >
            New Champion
          </button>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">Score:</span>
            <span className="text-xl">{score}</span>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="font-bold text-lg">Your Guesses:</h2>
          {guesses.map((guess, i) => (
            <div key={i} className="bg-gray-800 p-3 rounded-lg">
              <div className="flex items-start gap-3">
                <img 
                  src={`https://ddragon.leagueoflegends.com/cdn/13.1.1/img/champion/${guess.champion.image.full}`} 
                  className="w-12 h-12 rounded-full" 
                  alt={guess.champion.name}
                />
                <div>
                  <h3 className="font-bold">{guess.champion.name}</h3>
                  <pre className="text-sm text-gray-300 whitespace-pre-wrap">{guess.comparison}</pre>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}