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
    title: 'Assassin',
    lyricist: 'Zer0',
    composer: 'くろどる',
    illustrator: 'えぬ。',
    cover: '/images/zero_kurodoru_yaruko.png',
    audioUrl: '/songs/01.mp3',
  },
  {
    id: 2,
    title: '愛你キャンバス',
    lyricist: 'ばに',
    composer: 'えぬ。',
    illustrator: 'to-ko.',
    cover: '/images/banitanu_to-ko.png',
    audioUrl: '/songs/02.mp3',
  },
  {
    id: 3,
    title: 'MERROR',
    lyricist: 'DJ CAD',
    composer: 'Yus',
    illustrator: 'えぬ。',
    cover: '/images/yus_CAD_やる子.png',
    audioUrl: '/songs/03.mp3',
  },
  {
    id: 4,
    title: 'でてむ学園 ',
    lyricist: '',
    composer: '作曲者全体曲',
    illustrator: 'KiNoTch.',
    cover: '/images/作曲組_KiNoTch_KiNoTch.png',
    audioUrl: '/songs/04.mp3',
  },
  {
    id: 5,
    title: '「Avяlon」',
    lyricist: '亀選任',
    composer: 'to-ko.',
    illustrator: 'to-ko.',
    cover: '/images/亀選任_to-ko._to-ko..png',
    audioUrl: '/songs/05.mp3',
  },
  {
    id: 6,
    title: 'サイフヒロイン',
    lyricist: 'KiNoTch.',
    composer: 'くろどる',
    illustrator: '',
    cover: '/images/top_img.png',
    audioUrl: '/songs/06.mp3',
  },
  {
    id: 7,
    title: 'Horizon',
    lyricist: 'Achan',
    composer: 'なぎさ',
    illustrator: 'KiNoTch.',
    cover: '/images/nagisa_achan_kinotch.png',
    audioUrl: '/songs/07.mp3',
  },
  {
    id: 8,
    title: 'Muse Day',
    lyricist: 'km33',
    composer: 'takuto',
    illustrator: 'to-ko.',
    cover: '/images/Takuto_km33_to-ko.png',
    audioUrl: '/songs/08.mp3',
  },
  {
    id: 9,
    title: '本気可愛テクニック！(大嘘)',
    lyricist: 'Zen',
    composer: 'うる',
    illustrator: 'KiNoTch.',
    cover: '/images/uru_kino.png',
    audioUrl: '/songs/09.mp3',
  },
  {
    id: 10,
    title: '七色パレット',
    lyricist: '全体曲',
    composer: '',
    illustrator: '',
    cover: '/images/top_img.png',
    audioUrl: '/songs/10.mp3',
  },
]
