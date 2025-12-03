export type Song = {
  id: number
  title: string
  artist: string
  album: string
  cover: string
  duration: string
  releaseYear: number
  spotifyTrackId: string
}

const songTemplates = [
  { title: "Midnight Dreams", artist: "Luna Echo", album: "Starlight Symphony" },
  { title: "Electric Pulse", artist: "Neon Flux", album: "Digital Horizon" },
  { title: "Ocean Waves", artist: "Coastal Breeze", album: "Seaside Memories" },
  { title: "City Lights", artist: "Urban Soul", album: "Metropolitan Nights" },
  { title: "Velvet Sky", artist: "Aurora Dawn", album: "Twilight Tales" },
  { title: "Thunder Road", artist: "Steel Thunder", album: "Highway Chronicles" },
  { title: "Crystal Rain", artist: "Prism Light", album: "Reflection" },
  { title: "Golden Hour", artist: "Sunset Collective", album: "Amber Skies" },
  { title: "Neon Paradise", artist: "Cyber Pulse", album: "Future Nostalgia" },
  { title: "Silent Echo", artist: "Whisper Wind", album: "Quiet Moments" },
  { title: "Starfall", artist: "Cosmic Drift", album: "Infinite Space" },
  { title: "Desert Wind", artist: "Sand Storm", album: "Oasis Dreams" },
  { title: "Firefly Dance", artist: "Night Garden", album: "Summer Nights" },
  { title: "Frozen Lake", artist: "Winter Frost", album: "Ice Kingdom" },
  { title: "Rainbow Bridge", artist: "Spectrum", album: "Color Theory" },
  { title: "Shadow Play", artist: "Dark Matter", album: "Eclipse" },
  { title: "Sunrise Melody", artist: "Morning Dew", album: "New Day" },
  { title: "Lunar Phase", artist: "Moon Child", album: "Celestial" },
  { title: "Wild Heart", artist: "Forest Echo", album: "Nature Calls" },
  { title: "Digital Love", artist: "Pixel Dreams", album: "Retro Wave" },
]

const durations = ["3:24", "4:12", "3:45", "5:01", "3:58", "4:33", "3:15", "4:48", "3:36", "4:22"]
const years = [2022, 2023, 2024]

export const songs: Song[] = Array.from({ length: 100 }, (_, i) => {
  const template = songTemplates[i % songTemplates.length]
  const suffix = i >= 20 ? ` ${Math.floor(i / 20) + 1}` : ""

  return {
    id: i + 1,
    title: `${template.title}${suffix}`,
    artist: template.artist,
    album: template.album,
    cover: `https://picsum.photos/seed/song${i + 1}/400/400`,
    duration: durations[i % durations.length],
    releaseYear: years[i % years.length],
    // サンプル用：実際のSpotifyトラックIDに置き換えてください
    spotifyTrackId: "4iV5W9uYEdYUVa79Axb7Rh"  // サンプル: "Hotline Bling" by Drake
  }
})
