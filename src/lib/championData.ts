// app/lib/championData.ts

export const championRegions: Record<string, string[]> = {
  "Demacia": ["Lux", "Garen", "JarvanIV", "XinZhao", "Fiora", "Shyvana", "Sona", "Vayne", "Galio", "Poppy", "Quinn", "Sylas", "Lucian", "Morgana", "Kayle", "Nilah"],
  "Noxus": ["Darius", "Draven", "Katarina", "Swain", "Leblanc", "Rell", "Riven", "Samira", "Sion", "Talon", "Vladimir", "Kled", "Cassiopeia", "Briar", "Mordekaiser"],
  "Ionia": ["Ahri", "Akali", "Irelia", "Jhin", "Karma", "Kayn", "Kennen", "LeeSin", "Lillia", "MasterYi", "Rakan", "Sett", "Shen", "Syndra", "Varus", "Wukong", "Xayah", "Yasuo", "Yone", "Zed", "Hwei"],
  "Freljord": ["Anivia", "Ashe", "Braum", "Gnar", "Gragas", "Lissandra", "Nunu", "Olaf", "Ornn", "Sejuani", "Trundle", "Tryndamere", "Udyr", "Volibear"],
  "Piltover": ["Camille", "Caitlyn", "Ezreal", "Heimerdinger", "Jayce", "Orianna", "Seraphine", "Vi", "Zeri"],
  "Zaun": ["DrMundo", "Ekko", "Janna", "Jinx", "Singed", "Twitch", "Urgot", "Viktor", "Warwick", "Zac", "Ziggs", "RenataGlasc"],
  "Shurima": ["Akshan", "Amumu", "Azir", "KSante", "Nasus", "Rammus", "Renekton", "Sivir", "Skarner", "Taliyah", "Xerath"],
  "Shadow Isles": ["Elise", "Gwen", "Hecarim", "Kalista", "Karthus", "Maokai", "Senna", "Thresh", "Viego", "Yorick", "Vex", "Mordekaiser"],
  "Bilgewater": ["Fizz", "Gangplank", "Graves", "Illaoi", "MissFortune", "Nautilus", "Pyke", "TahmKench", "TwistedFate"],
  "Targon": ["Aphelios", "AurelionSol", "Bard", "Diana", "Leona", "Pantheon", "Soraka", "Taric", "Zoe"],
  "Void": ["Belveth", "ChoGath", "KaiSa", "Kassadin", "KhaZix", "KogMaw", "Malzahar", "RekSai", "VelKoz", "Naafiri"],
  "Ixtal": ["Qiyana", "Neeko", "Zyra", "Malphite", "Rengar", "Nidalee", "Milio"], // Added Ixtal
  "Runeterra": ["Alistar", "Annie", "Blitzcrank", "Brand", "Fiddlesticks", "Jax", "Kindred", "Lulu", "Nocturne", "Ryze", "Shaco", "Teemo", "Veigar", "Yuumi", "Zilean"]
};

export const championRaces: Record<string, string[]> = {
  "Human": [
    "Akshan", "Aphelios", "Ashe", "Caitlyn", "Camille", "Cassiopeia", "Darius", 
    "Diana", "Draven", "Ekko", "Ezreal", "Fiora", "Gangplank", "Garen", "Graves", 
    "Illaoi", "Irelia", "JarvanIV", "Jax", "Jayce", "Jhin", "Karma", "Katarina", 
    "Kayle", "Kayn", "Kennen", "KSante", "Leblanc", "Leona", "Lillia", "Lucian", 
    "Lux", "MasterYi", "MissFortune", "Mordekaiser", "Nilah", "Pantheon", "Pyke", 
    "Quinn", "RenataGlasc", "Riven", "Samira", "Sejuani", "Senna", "Sett", 
    "Shen", "Sivir", "Sylas", "Talon", "Taric", "Tryndamere", "TwistedFate", 
    "Udyr", "Vayne", "Vi", "Viktor", "Vladimir", "Xayah", "XinZhao", "Yasuo", 
    "Yone", "Zed", "Zeri", "Qiyana", "Nidalee", "Milio", "Annie", "Gragas", 
    "Jinx", "LeeSin", "Rell", "Ryze", "Seraphine", "Syndra", "Zilean", "Hwei"
  ],
  "Yordle": [
    "Gnar", "Heimerdinger", "Kled", "Lulu", "Poppy", "Rumble", "Teemo", 
    "Tristana", "Veigar", "Yuumi", "Ziggs", "Vex"
  ],
  "Vastayan": ["Ahri", "Neeko", "Rakan", "Wukong", "Xayah", "Rengar"],
  "Darkin": ["Aatrox", "Varus", "Rhaast"],
  "Celestial": ["AurelionSol", "Bard", "Soraka"],
  "Undead": ["Hecarim", "Kalista", "Karthus", "Maokai", "Thresh", "Yorick", "Viego", "Sion"],
  "God/Spirit": ["Anivia", "Janna", "Kindred", "Ornn", "Volibear"],
  "Artificial": ["Blitzcrank", "Orianna", "Zyra", "Gwen"],
  "Brackern": ["Skarner"],
  "Ascended": ["Azir", "Nasus", "Renekton", "Xerath"],
  "Voidborn": [
    "Belveth", "ChoGath", "KaiSa", "Kassadin", "KhaZix", "KogMaw", 
    "Malzahar", "Naafiri", "RekSai", "VelKoz"
  ],
  "Demon": ["Evelynn", "Fiddlesticks", "Nocturne", "Shaco", "TahmKench"],
  "Magically Altered": [
    "DrMundo", "Singed", "Twitch", "Urgot", "Warwick", "Zac", "Brand", "Ivern", "Nautilus"
  ],
  "Iceborn": ["Braum", "Lissandra", "Olaf", "Trundle"],
  "Dragon": ["AurelionSol", "Shyvana"],
  "Golem": ["Galio", "Malphite"],
  "Other": ["Alistar", "Amumu", "Elise", "Fizz", "Rammus"]
};
  
  const normalizeName = (name: string) => name.replace(/[ '\-.]/g, "");
  
  export const getChampionRegion = (name: string) => {
    const normalized = normalizeName(name);
    for (const [region, champs] of Object.entries(championRegions)) {
      if (champs.some(c => normalizeName(c) === normalized)) return region;
    }
    return "Runeterra";
  };
  
  export const getChampionRace = (name: string) => {
    const normalized = normalizeName(name);
    
    if (normalized === "AurelionSol") return "Dragon";
    if (normalized === "Shyvana") return "Dragon";
    if (normalized === "Orianna") return "Artificial";
  
    for (const [race, champs] of Object.entries(championRaces)) {
      if (champs.some(c => normalizeName(c) === normalized)) return race;
    }
    return "Other";
  };