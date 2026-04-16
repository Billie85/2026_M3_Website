'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { X, Play, Pause, SkipForward, SkipBack } from 'lucide-react'
import type { Song } from '@/data/songs'
import { members } from '@/data/members'

type Props = {
  song: Song | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function NameWithX({ name }: { name: string }) {
  const m = members[name]
  return (
    <span className="inline-flex items-center gap-0.5">
      <span>{name}</span>
      {m?.x && (
        <a href={m.x} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 text-white/40 hover:text-white transition-colors"
          onClick={e => e.stopPropagation()}
          aria-label={`${name} X`}>
          <XIcon />
        </a>
      )}
    </span>
  )
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
  // 曲が変わったら新しいAudioを作成
  useEffect(() => {
    if (!song) return

    const audio = new Audio(song.audioUrl)
    audioRef.current = audio

    audio.addEventListener('loadedmetadata', () => setDuration(audio.duration))
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('ended', onNext)

    // 常に自動再生
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false))

    return () => {
      audio.pause()
      audio.src = ''
      audioRef.current = null
      setIsPlaying(false)
      setCurrentTime(0)
      setDuration(0)
    }
  }, [song, onNext])

  // モーダルが開いている間は背景スクロールを無効化（iOS Safari対応）
  useEffect(() => {
    if (!song) return
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [song])

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
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
      style={{ background: 'rgb(29 29 30 / 86%)' }}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >

      {/* モーダル本体ラッパー */}
      <div className="relative" onClick={e => e.stopPropagation()}>
        {/* 閉じるボタン（カードの上） */}
        <button
          onClick={onClose}
          className="absolute -top-9 right-4 z-50 p-1.5 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
          aria-label="閉じる"
        >
          <X size={18} />
        </button>

        {/* モーダル本体 */}
        <div
          className="relative z-10 flex flex-col overflow-hidden"
          style={{ width: 'min(92vw, 380px)', height: '87svh' }}
        >
          {/* 画像エリア */}
          <div className="relative w-full flex-1 min-h-0">
            <Image
              src={song.cover}
              alt={song.title}
              fill
              sizes="380px"
              className="object-contain object-top"
              priority
            />
          </div>

        {/* 情報＋コントロールエリア */}
        <div className="shrink-0 px-4 pt-3 pb-2 rounded-2xl mt-2">
          {/* 曲情報 */}
          <h2 className="text-lg font-black text-white leading-tight break-words mt-2 mb-1">{song.title}</h2>
          {/* クレジット */}
          <div className="flex flex-wrap items-center gap-x-1.5 text-sm text-white mb-2.5">
            {song.lyricist && <NameWithX name={song.lyricist} />}
            {song.lyricist && song.composer && (
              <span className="text-white/40">/</span>
            )}
            {song.composer && <NameWithX name={song.composer} />}
            {song.illustrator && (
              <>
                <span className="text-white/40">/</span>
                <span className="text-white/40 text-xs">絵師 :</span>
                <NameWithX name={song.illustrator} />
              </>
            )}
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
                background: `linear-gradient(to right, #4889e3 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          {/* コントロール */}
          <div className="flex items-center justify-center gap-8 relative">
            <button
              onClick={onPrev}
              className="text-white/60 transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = '#4889e3')}
              onMouseLeave={e => (e.currentTarget.style.color = '')}
              aria-label="前の曲"
            >
              <SkipBack size={26} />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              style={{ background: '#4889e3' }}
              aria-label={isPlaying ? '停止' : '再生'}
            >
              {isPlaying
                ? <Pause size={22} className="text-black" />
                : <Play size={22} className="text-black ml-0.5" />
              }
            </button>
            <button
              onClick={onNext}
              className="text-white/60 transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = '#4889e3')}
              onMouseLeave={e => (e.currentTarget.style.color = '')}
              aria-label="次の曲"
            >
              <SkipForward size={26} />
            </button>
            <a href="https://x.com/Detemuhan" target="_blank" rel="noopener noreferrer" className="absolute right-0" onClick={e => e.stopPropagation()} aria-label="でてむはん X">
              <Image src="/images/detemu_log.png" alt="でてむはん" width={37} height={37} className="object-contain opacity-60 hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
