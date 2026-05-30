export interface Photo {
  id: string;
  src: string;
  title: string;
  location: string;
  date: string;
  album: string;
}

export const photos: Photo[] = [
  {
    id: "1",
    src: "/images/still-life.jpg",
    title: "旧时光的温度",
    location: "上海·法租界",
    date: "2024-10",
    album: "静物",
  },
  {
    id: "2",
    src: "/images/fashion-back.jpg",
    title: "风中的轮廓",
    location: "东京·原宿",
    date: "2024-09",
    album: "人像",
  },
  {
    id: "3",
    src: "/images/mountain-mist.jpg",
    title: "晨雾中的峡谷",
    location: "云南·元阳",
    date: "2024-08",
    album: "自然",
  },
  {
    id: "4",
    src: "/images/still-life.jpg",
    title: "午后的咖啡渍",
    location: "杭州·西湖",
    date: "2024-07",
    album: "静物",
  },
  {
    id: "5",
    src: "/images/mountain-mist.jpg",
    title: "暮色四合",
    location: "冰岛·维克",
    date: "2024-06",
    album: "自然",
  },
  {
    id: "6",
    src: "/images/fashion-back.jpg",
    title: "背影的温度",
    location: "巴黎·玛黑区",
    date: "2024-05",
    album: "人像",
  },
];

export const albums = ["全部", "静物", "人像", "自然"];
