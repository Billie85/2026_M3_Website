export type Song = {
  id: number
  title: string
  lyricist: string
  composer: string
  illustrator: string
  singers: string[]
  cover: string
  audioUrl: string
}

export const songs: Song[] = [
  {
    id: 1,
    title: 'Horizon',
    lyricist: 'なぎさ Achan',
    composer: 'Achan',
    illustrator: 'きのっち',
    singers: ['Achan', 'なぎさ'],
    cover: '/images/なぎさ_Achan_KiNoTch.png',
    audioUrl: '/songs/horizon.mp3',
  },
  {
    id: 2,
    title: 'でてむ学園',
    lyricist: 'KiNoTch',
    composer: '全体',
    illustrator: 'KiNoTch',
    singers: [],
    cover: '/images/作曲組_KiNoTch_KiNoTch.png',
    audioUrl: '/songs/detemu-gakuen.mp3',
  },
  {
    id: 3,
    title: 'MERROR',
    lyricist: 'CAD',
    composer: 'Yus',
    illustrator: 'やる子',
    singers: ['CAD', 'Yus'],
    cover: '/images/yus_CAD_やる子.png',
    audioUrl: '/songs/merror.mp3',
  },
  {
    id: 4,
    title: 'Assassin',
    lyricist: 'Zero',
    composer: 'くろどる',
    illustrator: 'やる子',
    singers: ['Zero', 'くろどる'],
    cover: '/images/zero_kurodoru_yaruko.png',
    audioUrl: '',
  },
  {
    id: 5,
    title: '本気可愛テクニック！(大嘘)',
    lyricist: 'うる',
    composer: 'ぜん',
    illustrator: 'KiNoTch',
    singers: ['ぜん', 'うる'],
    cover: '/images/ZEN_うる_KiNoTch._.png',
    audioUrl: '/songs/honki-kawaii.mp3',
  },
  {
    id: 6,
    title: 'Muse Day',
    lyricist: 'Km33',
    composer: 'Takuto',
    illustrator: 'トーコ',
    singers: ['Km33', 'Takuto'],
    cover: '/images/Takuto_km33_to-ko.png',
    audioUrl: '/songs/muse-day.mp3',
  },
  {
    id: 7,
    title: '愛你キャンバス',
    lyricist: 'ばにたぬ',
    composer: 'やる子',
    illustrator: 'トーコ',
    singers: ['ばにたぬ', 'やる子'],
    cover: '/images/ばにたぬ_やる子_to-ko.png',
    audioUrl: '/songs/aini-canvas.mp3',
  },
  {
    id: 8,
    title: 'Avяlon',
    lyricist: '亀選任',
    composer: 'トーコ',
    illustrator: 'トーコ',
    singers: ['亀選任', 'トーコ'],
    cover: '/images/亀選任_to-ko._to-ko..png',
    audioUrl: '/songs/avalon.mp3',
  },
  {
    id: 9,
    title: '七色パレット',
    lyricist: '全体曲',
    composer: '',
    illustrator: '',
    singers: [],
    cover: '',
    audioUrl: '/songs/nanairo-palette.mp3',
  },
]
