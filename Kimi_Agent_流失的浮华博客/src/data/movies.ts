export interface Movie {
  id: string;
  poster: string;
  title: string;
  originalTitle: string;
  rating: number;
  genre: string;
  director: string;
  year: number;
  synopsis: string;
  review: string;
  tags: string[];
}

export const movies: Movie[] = [
  {
    id: "1",
    poster: "/images/mountain-mist.jpg",
    title: "重庆森林",
    originalTitle: "Chungking Express",
    rating: 9.2,
    genre: "爱情",
    director: "王家卫",
    year: 1994,
    synopsis: "两段关于失恋与邂逅的故事，在香港拥挤的街道和24小时便利店里交织。",
    review: "王家卫最温柔的一部电影。金城武的过期凤梨罐头，梁朝伟的肥皂自言自语，王菲的California Dreaming——每一个意象都已经成为一种情绪的象征。它讲的是孤独，却拍得如此轻盈。",
    tags: ["爱情", "都市", "经典"],
  },
  {
    id: "2",
    poster: "/images/still-life.jpg",
    title: "小森林",
    originalTitle: "Little Forest",
    rating: 8.9,
    genre: "剧情",
    director: "森淳一",
    year: 2014,
    synopsis: "市子回到故乡小森，在四季更替中种植、烹饪、独自生活，寻找内心的平静。",
    review: "这是一部让人安静下来的电影。没有激烈的冲突，没有跌宕起伏的情节，只有四季的风景、简单的食物和一个人与自然的对话。看完想立刻回到乡下，种一片菜地。",
    tags: ["治愈", "日本", "田园"],
  },
  {
    id: "3",
    poster: "/images/fashion-back.jpg",
    title: "花样年华",
    originalTitle: "In the Mood for Love",
    rating: 9.1,
    genre: "爱情",
    director: "王家卫",
    year: 2000,
    synopsis: "1962年的香港，两对夫妻的邻居。当发现各自的配偶有了外遇，两颗受伤的心开始靠近。",
    review: "这可能是电影史上最克制的一部爱情片。周慕云和苏丽珍始终没有越界，但那种暗流涌动的情感张力，比任何直白的表达都更加令人心碎。杜可风的摄影和梅林茂的配乐，共同织就了一个关于遗憾的梦。",
    tags: ["爱情", "怀旧", "经典"],
  },
  {
    id: "4",
    poster: "/images/mountain-mist.jpg",
    title: "海街日记",
    originalTitle: "Our Little Sister",
    rating: 8.8,
    genre: "剧情",
    director: "是枝裕和",
    year: 2015,
    synopsis: "三姐妹在父亲的葬礼上结识了同父异母的妹妹，邀请她来到镰仓一起生活。",
    review: "是枝裕和的电影总是能从最日常的细节中提炼出最深的情感。四姐妹在镰仓的老房子里度过的四季，每一段对话、每一顿饭、每一次争吵，都充满了生活的质感。它让我相信，家庭的意义不在于血缘，而在于陪伴。",
    tags: ["家庭", "日本", "治愈"],
  },
  {
    id: "5",
    poster: "/images/still-life.jpg",
    title: "路边野餐",
    originalTitle: "Kaili Blues",
    rating: 8.5,
    genre: "剧情",
    director: "毕赣",
    year: 2015,
    synopsis: "一个乡村医生在寻找侄子的旅途中，穿越了过去、现在与梦境。",
    review: `四十分钟的长镜头是影史经典，但这部电影的魅力远不止于此。毕赣用他独特的时空观，把贵州的山水变成了一首诗。它不是那种会让你"看懂"的电影，但它会在你的潜意识里留下长久的回响。`,
    tags: ["文艺", "中国", "诗意"],
  },
  {
    id: "6",
    poster: "/images/fashion-back.jpg",
    title: "千与千寻",
    originalTitle: "Spirited Away",
    rating: 9.4,
    genre: "动画",
    director: "宫崎骏",
    year: 2001,
    synopsis: "十岁的千寻误入神灵世界，为了救回变成猪的父母，她在汤屋开始了异世界的冒险。",
    review: "宫崎骏的巅峰之作。表面上是一个关于成长的冒险故事，实际上它讲的是我们每个人在成人世界中失去名字、失去自我，然后重新找回的过程。那条看不到尽头的海上列车，是我心目中电影史上最浪漫的场景。",
    tags: ["动画", "奇幻", "经典"],
  },
];

export const movieGenres = ["全部", "爱情", "剧情", "动画"];
