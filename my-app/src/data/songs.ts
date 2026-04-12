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
    title: 'Assassin',
    lyricist: 'Zero',
    composer: 'くろどる',
    illustrator: 'えぬ。',
    singers: ['Zero'],
    cover: '/images/zero_kurodoru_yaruko.png',
    audioUrl: '/songs/zero_kurodoru.mp3',
  },
  {
    id: 2,
    title: '愛你キャンバス',
    lyricist: 'ばに',
    composer: 'えぬ。',
    illustrator: 'to-ko.',
    singers: ['えぬ。'],
    cover: '/images/banitanu_to-ko.png',
    audioUrl: '/songs/aini-canvas.mp3',
  },
  {
    id: 3,
    title: 'MERROR',
    lyricist: 'CAD',
    composer: 'Yus',
    illustrator: 'えぬ。',
    singers: ['Yus'],
    cover: '/images/yus_CAD_やる子.png',
    audioUrl: '/songs/merror.mp3',
  },
  {
    id: 4,
    title: 'でてむ学園 〜開かずの間と大いなるカブ〜',
    lyricist: 'KiNoTch.',
    composer: '作曲者全体曲',
    illustrator: 'KiNoTch.',
    singers: [],
    cover: '/images/作曲組_KiNoTch_KiNoTch.png',
    audioUrl: '/songs/detemu-gakuen.mp3',
  },
  {
    id: 5,
    title: '「Avяlon」',
    lyricist: '亀選任',
    composer: 'to-ko.',
    illustrator: 'to-ko.',
    singers: ['to-ko.'],
    cover: '/images/亀選任_to-ko._to-ko..png',
    audioUrl: '/songs/avalon.mp3',
  },
  {
    id: 6,
    title: 'サイフヒロイン',
    lyricist: 'KiNoTch.',
    composer: 'くろどる',
    illustrator: '',
    singers: [],
    cover: '/images/top_img.png',
    audioUrl: ' /songs/kinotch_kuro.mp3',
  },
  {
    id: 7,
    title: 'Horizon',
    lyricist: 'Achan',
    composer: 'なぎさ',
    illustrator: 'KiNoTch.',
    singers: ['なぎさ'],
    cover: '/images/nagisa_achan_kinotch.png',
    audioUrl: '/songs/horizon.mp3',
  },
  {
    id: 8,
    title: 'Muse Day',
    lyricist: 'km33',
    composer: 'takuto',
    illustrator: 'to-ko.',
    singers: ['takuto'],
    cover: '/images/Takuto_km33_to-ko.png',
    audioUrl: '/songs/muse-day.mp3',
  },
  {
    id: 9,
    title: '本気可愛テクニック！(大嘘)',
    lyricist: 'Zen',
    composer: 'うる',
    illustrator: 'KiNoTch.',
    singers: ['Zen'],
    cover: '/images/ZEN_うる_KiNoTch._.png',
    audioUrl: '/songs/honki-kawaii.mp3',
  },
  {
    id: 10,
    title: '七色パレット',
    lyricist: '全体曲',
    composer: '',
    illustrator: '',
    singers: [],
    cover: '/images/top_img.png',
    audioUrl: '/songs/nanairo-palette.mp3',
  },
]
