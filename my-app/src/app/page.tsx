'use client'

import { useState, useMemo, useRef, useCallback } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Search } from 'lucide-react'
import { songs, type Song } from '@/data/songs'
import { SongCard } from '@/components/SongCard'
import { SongDetail } from '@/components/SongDetail'
import { SpotifyPlayer } from '@/components/SpotifyPlayer'

export default function MusicPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)
  const parentRef = useRef<HTMLDivElement>(null)

  const filteredSongs = useMemo(() => {
    if (!searchQuery.trim()) return songs
    const query = searchQuery.toLowerCase()
    return songs.filter(
      (song) =>
        song.title.toLowerCase().includes(query) ||
        song.artist.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const virtualizer = useVirtualizer({
    count: filteredSongs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 68,
    overscan: 5,
  })

  const handleCardClick = useCallback((song: Song) => {
    setSelectedSong(song)
  }, [])

  const hasPlayer = selectedSong !== null

  return (
    <div className={`h-screen bg-gradient-to-b from-zinc-900 to-black overflow-hidden ${hasPlayer ? 'pb-36' : ''}`}>
      {/* PC: 横並び / スマホ: 縦並び（詳細が上、リストが下） */}
      <div className="flex flex-col-reverse md:flex-row h-screen">

        {/* 曲リスト（PC: 左側 / スマホ: 下側） */}
        <div className="flex-1 md:w-3/5 lg:w-2/3 flex flex-col border-r border-zinc-800 min-h-0">
          <div className="px-4 py-2 text-zinc-500 text-sm">
            {filteredSongs.length} 曲
          </div>

          {filteredSongs.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-zinc-400 text-lg">該当する曲が見つかりません</p>
            </div>
          ) : (
            <div
              ref={parentRef}
              className="flex-1 overflow-auto px-4"
              style={{ contain: 'strict' }}
            >
              <div
                style={{
                  height: `${virtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const song = filteredSongs[virtualRow.index]
                  const isSelected = selectedSong?.id === song.id
                  return (
                    <div
                      key={virtualRow.key}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${virtualRow.start}px)`,
                      }}
                    >
                      <div className={`rounded-lg ${isSelected ? 'bg-zinc-800 ring-1 ring-[#1DB954]' : ''}`}>
                        <SongCard
                          song={song}
                          index={virtualRow.index}
                          onClick={() => handleCardClick(song)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* 曲詳細（PC: 右側 / スマホ: 上側） */}
        <div className="h-1/2 md:h-full md:w-2/5 lg:w-1/3 bg-zinc-950">
          <SongDetail song={selectedSong} />
        </div>
      </div>

      {/* 画面下部固定: Spotifyプレイヤー */}
      <SpotifyPlayer song={selectedSong} />
    </div>
  )
}
