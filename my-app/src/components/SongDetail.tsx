'use client'

import Image from 'next/image'
import { Calendar, Clock, Disc } from 'lucide-react'
import type { Song } from '@/data/songs'

type Props = {
  song: Song | null
}

export function SongDetail({ song }: Props) {
  if (!song) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500">
        <p>曲を選択してください</p>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      {/* アルバムアート - 横幅いっぱい */}
      <div className="relative w-full aspect-square mb-4 rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={song.cover}
          alt={`${song.title} - ${song.artist}`}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </div>

      {/* 曲情報 */}
      <div className="text-center">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-1">{song.title}</h2>
        <p className="text-zinc-300 text-base md:text-lg mb-4">{song.artist}</p>

        <div className="space-y-2 text-xs md:text-sm text-zinc-400 inline-block text-left">
          <div className="flex items-center gap-2">
            <Disc size={18} />
            <span>{song.album}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
            <span>{song.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <span>{song.releaseYear}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
