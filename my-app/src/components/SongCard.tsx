'use client'

import Image from 'next/image'
import { Play } from 'lucide-react'
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
      className="song-card group w-full flex items-center gap-3 rounded-xl p-3 text-left backdrop-blur-md transition-all duration-200"
      style={{ background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '3px solid rgba(125,171,40,0.35)' }}
      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderLeft = '3px solid #7dab28'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderLeft = '3px solid rgba(125,171,40,0.35)'; }}
    >
      {/* 番号 / ホバーで再生アイコン */}
      <span className="w-6 shrink-0 relative">
        <span className="text-sm group-hover:opacity-0 transition-opacity duration-150" style={{ color: '#7dab28' }}>
          {index + 1}
        </span>
        <span className="absolute inset-0 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <Play size={14} style={{ color: '#7dab28', fill: '#7dab28' }} />
        </span>
      </span>

      {/* サムネイル */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-sm">
        <Image
          src={song.cover}
          alt={song.title}
          fill
          sizes="48px"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* 曲情報 */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate text-sm group-hover:text-[#7dab28] transition-colors duration-200">
          {song.title}
        </h3>
        <p className="text-white/50 text-xs truncate mt-0.5">
          {song.lyricist}
        </p>
      </div>

      {/* 右矢印 */}
      <span className="text-white/20 group-hover:text-[#7dab28] group-hover:translate-x-0.5 transition-all duration-200 shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </span>
    </button>
  )
}
