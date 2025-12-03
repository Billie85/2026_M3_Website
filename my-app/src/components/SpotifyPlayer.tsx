'use client'

import { ExternalLink } from 'lucide-react'
import type { Song } from '@/data/songs'

type Props = {
  song: Song | null
}

export function SpotifyPlayer({ song }: Props) {
  if (!song) return null

  const spotifyEmbedUrl = `https://open.spotify.com/embed/track/${song.spotifyTrackId}?utm_source=generator&theme=0`
  const spotifyUrl = `https://open.spotify.com/track/${song.spotifyTrackId}`

  return (
    <div
      className="fixed bottom-0 left-0 w-screen z-10000 bg-zinc-900 border-t border-zinc-800">
      {/* 曲名表示 */}
      <div className="px-4 py-2 border-b border-zinc-800">
        <p className="text-white font-medium truncate">{song.title}</p>
        <p className="text-zinc-400 text-sm truncate">{song.artist}</p>
      </div>

      <iframe
        key={song.id}
        src={spotifyEmbedUrl}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="border-0"
      />
      <div className="px-4 py-2 flex items-center justify-between">
        <p className="text-zinc-400 text-xs">30秒プレビュー</p>
        <a
          href={spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[#1DB954] hover:text-[#1ed760] text-sm font-medium transition-colors"
        >
          <span>Spotifyでフル再生</span>
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  )
}
