'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { songs, type Song } from '@/data/songs'
import { SongCard } from '@/components/SongCard'
import { SongModal } from '@/components/SongModal'

export default function MusicPage() {
  const [selectedSong, setSelectedSong] = useState<Song | null>(null)

  const handleCardClick = useCallback((song: Song) => {
    setSelectedSong(song)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedSong(null)
  }, [])

  const handleNext = useCallback(() => {
    setSelectedSong((current) => {
      if (!current) return null
      const idx = songs.findIndex((s) => s.id === current.id)
      return songs[(idx + 1) % songs.length]
    })
  }, [])

  const handlePrev = useCallback(() => {
    setSelectedSong((current) => {
      if (!current) return null
      const idx = songs.findIndex((s) => s.id === current.id)
      return songs[(idx - 1 + songs.length) % songs.length]
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 flex flex-col page-enter">

      {/* ヘッダー */}
      <div className="px-6 pt-10 pb-5 text-left relative">
        {/* 背景の装飾円 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* アーティスト画像 */}
        <div className="relative w-72 h-72 mb-4 overflow-hidden animate-fade-in delay-100 mx-auto">
          <Image
            src="/images/top_image.png"
            alt="でてむはん"
            fill
            sizes="160px"
            className="object-cover"
            priority
          />
        </div>

        {/* タイトル */}
        <h1 className="text-2xl font-black text-zinc-600 tracking-[0.2em] mb-1 animate-fade-in-up">
          並行世界
        </h1>



        {/* 説明文 */}
        <p className="text-zinc-600 text-sm leading-relaxed max-w-xs animate-fade-in-up delay-200">
          でてむはんは、独自のサウンドと世界観で活動する音楽アーティストです。
          日常の感情をのせた楽曲で、多くのリスナーの心に寄り添っています。
        </p>

        {/* SNSリンク */}
        <div className="flex justify-start gap-7 mt-5 animate-fade-in-up delay-300">
          {/* YouTube */}
          <a href="#" className="sns-icon text-zinc-400 hover:text-red-500" aria-label="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          {/* Twitter / X */}
          <a href="#" className="sns-icon text-zinc-400 hover:text-zinc-900" aria-label="X (Twitter)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          {/* TikTok */}
          <a href="#" className="sns-icon text-zinc-400 hover:text-pink-500" aria-label="TikTok">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
            </svg>
          </a>
        </div>

        {/* 区切り線 */}
        <div className="mt-5 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      {/* 曲数 */}
      <div className="px-5 py-1.5 text-zinc-600 text-xs font-medium tracking-widest uppercase">
        {songs.length} tracks
      </div>

      {/* 曲リスト */}
      <div className="px-4 pb-10">
        <div className="flex flex-col gap-3">
          {songs.map((song, index) => (
            <div
              key={song.id}
              className="card-stagger"
              style={{ animationDelay: `${0.4 + index * 0.07}s` }}
            >
              <SongCard
                song={song}
                index={index}
                onClick={() => handleCardClick(song)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ポップアップモーダル */}
      <SongModal
        song={selectedSong}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  )
}
