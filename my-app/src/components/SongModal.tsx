'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { X, Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import type { Song } from '@/data/songs'

type Props = {
  song: Song | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function formatTime(sec: number): string {
  if (!isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function SongModal({ song, onClose, onNext, onPrev }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const wasPlayingRef = useRef(false)

  // 曲が変わったら新しいAudioを作成
  useEffect(() => {
    if (!song) return

    const audio = new Audio(song.audioUrl)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('ended', onNext)

    // 再生中に曲が切り替わった場合のみ自動再生
    if (wasPlayingRef.current) {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))
    }

    return () => {
      wasPlayingRef.current = !audio.paused
      audio.pause()
      audio.src = ''
      audioRef.current = null
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
    }
  }, [song, onNext])

  // Escキーで閉じる
  useEffect(() => {
    if (!song) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [song, onClose])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      audio.play().catch(() => {})
      setIsPlaying(true)
    }
  }, [isPlaying])

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const time = Number(e.target.value)
    audio.currentTime = time
    setCurrentTime(time)
  }, [])

  if (!song) return null

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-white/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* モーダル本体 */}
      <div className="relative z-10 w-screen h-screen overflow-hidden">

        {/* アルバムアート（全体） */}
        <Image
          src={song.cover}
          alt={`${song.title}`}
          fill
          sizes="384px"
          className="object-contain object-top"
          priority
        />

        {/* 閉じるボタン */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="閉じる"
        >
          <X size={18} />
        </button>

        {/* 下部オーバーレイ：曲情報＋コントロール */}
        <div className="absolute inset-x-0 bottom-0 z-10 px-4 pb-4 pt-8 bg-gradient-to-t from-black/80 via-black/80 to-transparent">

          {/* 曲情報 */}
          <h2 className="text-lg font-bold text-white mb-1 truncate">{song.title}</h2>
          <div className="flex gap-5 text-sm mb-4">
            <span><span className="text-white font-bold text-xs mr-1">作詞</span><span className="font-bold text-white">{song.lyricist}</span></span>
            <span><span className="text-white font-bold text-xs mr-1">作曲</span><span className="font-bold text-white">{song.composer}</span></span>
            <span><span className="text-white font-bold text-xs mr-1">絵師</span><span className="font-bold text-white">{song.illustrator}</span></span>
          </div>

          {/* プログレスバー */}
          <div className="mb-1">
            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #fff ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50 mb-4">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* コントロール */}
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={onPrev}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="前の曲"
            >
              <SkipBack size={26} />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform"
              aria-label={isPlaying ? '停止' : '再生'}
            >
              {isPlaying
                ? <Pause size={22} className="text-black" />
                : <Play size={22} className="text-black ml-0.5" />
              }
            </button>
            <button
              onClick={onNext}
              className="text-white/60 hover:text-white transition-colors"
              aria-label="次の曲"
            >
              <SkipForward size={26} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
