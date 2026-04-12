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
    <div className="min-h-screen flex flex-col page-enter" style={{ background: 'rgb(17 17 20 / 95%)' }}>

      {/* ヘッダー */}
      <div className="px-6 pt-10 pb-5 text-left relative">
        {/* 背景の装飾円 */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl -z-10 pointer-events-none" style={{ background: 'rgba(72,137,227,0.12)' }} />

        {/* アーティスト画像 */}
        <div className="relative w-80 h-80 mb-4 animate-fade-in delay-100 mx-auto">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/images/top_img.png"
              alt="でてむはん"
              fill
              sizes="384px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* タイトル */}
        <h1 className="text-2xl font-black text-white tracking-[0.2em] mb-2 animate-fade-in-up">
          並行世界
        </h1>

        {/* 説明文 */}
        <p className="text-white/70 text-sm leading-relaxed max-w-xs animate-fade-in-up delay-200">
        ◆でてむはんとは？<br></br>
        音楽からイラスト,3Dまで、多岐にわたるジャンルのクリエイターが集まったコミュニティ。
        Discordを起点に交流し、様々な情報交換や企画、ジャンルの垣根を超えたコラボレーション等、日々新しいクリエイションが生まれている。
        コンセプトは、”無限大の可能性を育てる”
        「まだ始めたてだけど夢がある」そんな方に成長の場を提供しています。
        </p>

      {/* SNSリンク */}
      <div className="flex justify-start gap-7 mt-5 animate-fade-in-up delay-300">
        <a href="https://www.youtube.com/channel/UCdr14jnfigh7tqX6tEJ7FcQ" target="_blank" rel="noopener noreferrer" className="sns-icon text-white/50 hover:text-red-400" aria-label="YouTube">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
        <a href="https://x.com/Detemuhan" target="_blank" rel="noopener noreferrer" className="sns-icon text-white/50 hover:text-white" aria-label="X (Twitter)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/@detemuhan" target="_blank" rel="noopener noreferrer" className="sns-icon text-white/50 hover:text-pink-400" aria-label="TikTok">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
          </svg>
        </a>
      </div>

        {/* 区切り線 */}
        <div className="mt-5 h-px bg-gradient-to-r from-transparent to-transparent" style={{ backgroundImage: 'linear-gradient(90deg, transparent, #4889e3, transparent)' }} />
      </div>

      {/* 曲数 */}
      <div className="px-5 py-1.5 text-xs font-medium tracking-widest uppercase" style={{ color: '#4889e3' }}>
        {songs.length} tracks
      </div>

      {/* 曲リスト */}
      <div className="px-4 pb-10">
        <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(72,137,227,0.25)' }}>
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
      </div>

      {/* 下部グロー */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-72 h-32 pointer-events-none -z-10" style={{ background: 'radial-gradient(ellipse, rgba(72,137,227,0.18) 0%, transparent 70%)' }} />

      <SongModal
        song={selectedSong}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  )
}
