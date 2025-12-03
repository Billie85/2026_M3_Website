'use client'

import Image from 'next/image'
import type { Song } from '@/data/songs'

type Props = {
  song: Song
  index: number
  onClick: () => void
}

export function SongCard({ song, index, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="group w-full flex items-center gap-3 bg-zinc-900/50 hover:bg-zinc-800 rounded-lg p-3 transition-all duration-200 text-left mt-5"
    >
      <span className="text-zinc-500 text-sm w-6 text-right shrink-0">
        {index + 1}
      </span>
      <div className="relative w-12 h-12 rounded overflow-hidden shrink-0">
        <Image
          src={song.cover}
          alt={`${song.title} - ${song.artist}`}
          fill
          sizes="48px"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-white truncate text-sm">
          {song.title}
        </h3>
        <p className="text-zinc-400 text-xs truncate">
          {song.artist}
        </p>
      </div>
      <span className="text-zinc-500 text-sm shrink-0">
        {song.duration}
      </span>
    </button>
  )
}
