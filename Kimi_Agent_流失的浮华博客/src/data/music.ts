export interface MusicTrack {
  id: string;
  cover: string;
  title: string;
  artist: string;
  album: string;
  description: string;
  tags: string[];
  duration: string;
}

export const musicTracks: MusicTrack[] = [
  {
    id: "1",
    cover: "/images/mountain-mist.jpg",
    title: "Merry Christmas Mr. Lawrence",
    artist: "坂本龙一",
    album: "Merry Christmas Mr. Lawrence",
    description: "钢琴的每一次触键都像是在叩问灵魂。这首曲子陪伴了我无数个失眠的夜晚，它的悲伤不是嚎啕大哭，而是一种克制的、深沉的哀愁。",
    tags: ["古典", "钢琴", "电影原声"],
    duration: "4:48",
  },
  {
    id: "2",
    cover: "/images/still-life.jpg",
    title: "Kind of Blue",
    artist: "Miles Davis",
    album: "Kind of Blue",
    description: "爵士乐历史上最伟大的专辑之一。每一次聆听，都能从中发现新的细节。它像一杯陈年的威士忌，越品越有味道。",
    tags: ["爵士", "小号", "经典"],
    duration: "43:48",
  },
  {
    id: "3",
    cover: "/images/fashion-back.jpg",
    title: "Astral Weeks",
    artist: "Van Morrison",
    album: "Astral Weeks",
    description: "一张充满神秘主义色彩的诗意专辑。它不像是流行音乐，更像是一场灵魂的独白。每一次听，都仿佛在做一场长梦。",
    tags: ["民谣", "灵魂乐", "诗意"],
    duration: "47:09",
  },
  {
    id: "4",
    cover: "/images/mountain-mist.jpg",
    title: "Gymnopédie No.1",
    artist: "Erik Satie",
    album: "Gymnopédies",
    description: "萨蒂的这首作品，是孤独者的圣歌。三个和弦循环往复，像是一条没有尽头的小路，引人走向内心最深处。",
    tags: ["古典", "钢琴", "极简"],
    duration: "3:25",
  },
  {
    id: "5",
    cover: "/images/still-life.jpg",
    title: "In a Silent Way",
    artist: "Miles Davis",
    album: "In a Silent Way",
    description: "电爵士的开山之作。安静中蕴含着巨大的能量，像深海下的暗流。适合深夜独自聆听，让思绪自由漂流。",
    tags: ["爵士", "融合", "电爵士"],
    duration: "38:08",
  },
  {
    id: "6",
    cover: "/images/fashion-back.jpg",
    title: "Hallelujah",
    artist: "Leonard Cohen",
    album: "Various Positions",
    description: "科恩用他沙哑的嗓音，将这首关于爱、失落与信仰的颂歌唱到了极致。每一次听，都会有不同的感悟。",
    tags: ["民谣", "创作歌手", "经典"],
    duration: "4:37",
  },
];

export const musicCategories = ["全部", "古典", "爵士", "民谣"];
