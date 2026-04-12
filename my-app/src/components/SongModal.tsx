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

function formatTime(sec: number): string {
  if (!isFinite(sec)) return '0:00'
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function MemberIcons({ name }: { name: string }) {
  if (!members[name]) return null
  const m = members[name]
  const ytUrl = m.youtube || ''
  const xUrl = m.x || ''

  const ytIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
  const xIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )

  return (
    <span className="inline-flex items-center gap-0.5 ml-1.5">
      {ytUrl ? (
        <a href={ytUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 text-red-500 hover:text-red-400 transition-colors"
          aria-label={`${name} YouTube`}>
          {ytIcon}
        </a>
      ) : (
        <span className="inline-flex items-center justify-center w-8 h-8 text-red-500/40">
          {ytIcon}
        </span>
      )}
      {xUrl ? (
        <a href={xUrl} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 text-white hover:text-white/70 transition-colors"
          aria-label={`${name} X`}>
          {xIcon}
        </a>
      ) : (
        <span className="inline-flex items-center justify-center w-8 h-8 text-white/40">
          {xIcon}
        </span>
      )}
    </span>
  )
}

export function SongModal({ song, onClose, onNext, onPrev }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showCredits, setShowCredits] = useState(false)
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
      setShowCredits(false)
    }
  }, [song, onNext])

  // モーダルが開いている間は背景スクロールを無効化
  useEffect(() => {
    if (!song) return
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
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
      <div className="relative z-10 w-screen h-screen overflow-hidden" onClick={() => { if (showCredits) setShowCredits(false) }}>

        {/* アルバムアート（全体） */}
        <Image
          src={song.cover}
          alt={`${song.title}`}
          fill
          sizes="384px"
          className={`object-contain ${song.id === 10 ? 'object-[center_30%]' : 'object-top'}`}
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
        <div className="absolute inset-x-0 bottom-0 z-10">
          {/* ブラーレイヤー：親にmask-imageを持たせ子にbackdrop-filterを置くことでiOS Safariのバグを回避しつつ境目をフェード */}
          <div className="absolute inset-0" style={{ maskImage: 'linear-gradient(to top, black 50%, transparent 75%)', WebkitMaskImage: 'linear-gradient(to top, black 50%, transparent 75%)' }}>
            <div className="absolute inset-0" style={{ backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }} />
          </div>
          {/* グラデーションオーバーレイ */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgb(23 23 25 / 97%) 0%, rgb(122 122 125 / 97%) 50%, transparent 75%)' }} />
          {/* コンテンツ */}
          <div className="relative px-4 pb-10 pt-48">

          {/* 曲情報 */}
          <div className="mb-1">
            <h2 className="text-2xl font-black text-white leading-tight">{song.title}</h2>
          </div>
          <button
            onClick={() => setShowCredits(v => !v)}
            className="flex items-center gap-1 text-white text-sm font-bold mb-2 hover:text-white/70 transition-colors"
          >
            <span>{showCredits ? '' : '詳細 ↓'}</span>
          </button>

          {showCredits && (
            <div className="flex flex-col mb-4 animate-[fadeIn_0.2s_ease]">
              {song.lyricist && (
                <span className="flex items-center gap-2">
                  <span className="text-xs w-10 shrink-0 font-medium" style={{ color: '#7dab28' }}>作詞</span>
                  <span className="font-bold text-white text-sm">{song.lyricist}</span>
                  {song.lyricist.split(/[\s　]+/).map(n => <MemberIcons key={n} name={n} />)}
                </span>
              )}
              {song.composer && (
                <span className="flex items-center gap-2">
                  <span className="text-xs w-10 shrink-0 font-medium" style={{ color: '#7dab28' }}>作曲</span>
                  <span className="font-bold text-white text-sm">{song.composer}</span>
                  {song.composer.split(/[\s　]+/).map(n => <MemberIcons key={n} name={n} />)}
                </span>
              )}
              {song.singers?.length > 0 && (
                <span className="flex items-center gap-2">
                  <span className="text-xs w-10 shrink-0 font-medium" style={{ color: '#7dab28' }}>歌い手</span>
                  <span className="font-bold text-white text-sm">{song.singers.join(' ')}</span>
                  {song.singers.map(n => <MemberIcons key={n} name={n} />)}
                </span>
              )}
              {song.illustrator && (
                <span className="flex items-center gap-2">
                  <span className="text-xs w-10 shrink-0 font-medium" style={{ color: '#7dab28' }}>絵師</span>
                  <span className="font-bold text-white text-sm">{song.illustrator}</span>
                  {song.illustrator.split(/[\s　]+/).map(n => <MemberIcons key={n} name={n} />)}
                </span>
              )}
            </div>
          )}

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
                background: `linear-gradient(to right, #7dab28 ${progress}%, rgba(255,255,255,0.2) ${progress}%)`,
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/50">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* コントロール */}
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={onPrev}
              className="text-white/60 transition-colors"
              onMouseEnter={e => (e.currentTarget.style.color = '#7dab28')}
              onMouseLeave={e => (e.currentTarget.style.color = '')}
              aria-label="前の曲"
            >
              <SkipBack size={26} />
            </button>
            <button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              style={{ background: '#7dab28' }}
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
              onMouseEnter={e => (e.currentTarget.style.color = '#7dab28')}
              onMouseLeave={e => (e.currentTarget.style.color = '')}
              aria-label="次の曲"
            >
              <SkipForward size={26} />
            </button>
          </div>
          </div>{/* コンテンツ終わり */}
        </div>{/* オーバーレイ終わり */}
      </div>
    </div>
  )
}
