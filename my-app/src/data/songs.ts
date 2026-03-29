export type Song = {
  id: number
  title: string
  lyricist: string
  composer: string
  illustrator: string
  cover: string
  audioUrl: string
}

export const songs: Song[] = [
  {
    id: 1,
    title: 'Horizon',
    lyricist: 'Achan',
    composer: 'なぎさ',
    illustrator: 'きのっち',
    cover: '/images/Achan＆なぎさ.png',
    audioUrl: '/songs/Achan＆なぎさ - Horizon.mp3',
  },
  {
    id: 2,
    title: '',
    lyricist: 'KiNoTch',
    composer: '',
    illustrator: 'KiNoTch',
    cover: '/images/KiNoTch＆作曲.png',
    audioUrl: '',
  },
  {
    id: 3,
    title: 'MERROR',
    lyricist: 'CAD',
    composer: 'Yus',
    illustrator: 'Yus',
    cover: '/images/Yus＆CAD.png',
    audioUrl: '/songs/CAD＆Yus - MERROR.mp3',
  },
  {
    id: 4,
    title: '',
    lyricist: 'Zero',
    composer: 'くろどる',
    illustrator: '',
    cover: '/images/zero＆くろどる1.png',
    audioUrl: '',
  },
  {
    id: 5,
    title: '本気可愛テクニック！(大嘘)',
    lyricist: 'ぜん',
    composer: 'うる',
    illustrator: 'うる',
    cover: '/images/ぜん＆うる.png',
    audioUrl: '/songs/ぜん＆うる - 本気可愛テクニック！(大嘘).mp3',
  },
  {
    id: 6,
    title: 'Muse Day',
    lyricist: 'Km33',
    composer: 'Takuto',
    illustrator: '',
    cover: '/images/たくと＆Km33.PNG',
    audioUrl: '/songs/Km33＆takuto - muse day.mp3',
  },
  {
    id: 7,
    title: '愛你キャンバス',
    lyricist: 'ばにたぬ',
    composer: 'やる子',
    illustrator: 'やる子',
    cover: '/images/やる子＆ばに.png',
    audioUrl: '/songs/ばにたぬ＆やる子 - 愛你キャンバス.mp3',
  },
  {
    id: 8,
    title: 'Avяlon',
    lyricist: '亀選任',
    composer: 'トーコ',
    illustrator: 'トーコ',
    cover: '/images/亀＆トーコ.png',
    audioUrl: '/songs/亀選任＆トーコ - Avяlon.mp3',
  },
  {
    id: 9,
    title: 'でてむ学園 〜開かずの間と大いなるカブ〜',
    lyricist: '全体曲',
    composer: '',
    illustrator: '',
    cover: '',
    audioUrl: '/songs/作曲者全体曲 - でてむ学園 〜開かずの間と大いなるカブ〜.mp3',
  },
  {
    id: 10,
    title: '七色パレット',
    lyricist: '全体曲',
    composer: '',
    illustrator: '',
    cover: '',
    audioUrl: '/songs/歌い手全体曲 - 七色パレット.mp3',
  },
]
