import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  '摄影', '胶片冲洗', '手冲咖啡', '日语', '写作', '旅行规划',
  '黑胶唱片鉴赏', '暗房技术', '茶道', '翻译',
];

const interests = [
  '独立电影', '爵士乐', '日本文学', '胶片摄影', '极简主义',
  '城市漫步', '中古家具', '手工纸', '晨间仪式', '观星',
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.animate-in');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item) => {
      gsap.set(item, { opacity: 0, y: 30 });
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(item, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        },
      });
      triggers.push(st);
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, []);

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] pt-32 md:pt-40">
      <div ref={sectionRef} className="max-w-[900px] mx-auto px-6 md:px-12 pb-32">
        {/* Header */}
        <div className="animate-in mb-20">
          <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
            About / 关于
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#f4f1ea] tracking-tight leading-tight">
            在文字与影像之间
          </h1>
        </div>

        {/* Bio */}
        <div className="animate-in mb-20">
          <div className="glass-container mb-12">
            <div className="glass-edge" />
            <div className="glass-highlight" />
            <div className="glass-content">
              <p className="font-sans text-lg text-[#d5cfc1] leading-relaxed mb-6">
                你好，我是这个博客的主人。一个用文字记录生活、用镜头捕捉瞬间、用音乐对抗时间的普通人。
              </p>
              <p className="font-sans text-base text-[#d5cfc1]/80 leading-relaxed mb-6">
                我相信，生活中最珍贵的东西往往藏在最平凡的细节里。一杯咖啡的香气、一张旧照片的泛黄边缘、一首老歌的前奏响起时心头的那一丝颤动——这些微不足道的瞬间，构成了我们生命的全部意义。
              </p>
              <p className="font-sans text-base text-[#d5cfc1]/80 leading-relaxed">
                "流失的浮华"是我为这些瞬间建造的一座小房子。在这里，我会分享我的旅行见闻、摄影心得、音乐推荐、观影感受，以及那些在某个深夜突然涌上心头的想法。希望你能在这里找到片刻的宁静。
              </p>
            </div>
          </div>
        </div>

        {/* Avatar & Identity */}
        <div className="animate-in mb-20 flex flex-col md:flex-row items-start gap-8 md:gap-12">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden flex-shrink-0">
            <img
              src="/images/fashion-back.jpg"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-[#f4f1ea] mb-2">浮华</h2>
            <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
              Writer / Photographer / Dreamer
            </p>
            <p className="font-sans text-sm text-[#d5cfc1]/70 leading-relaxed max-w-md">
              "摄影是凝固的时间，音乐是流动的时间，文字是重构的时间。我在这三种时间的交错中，寻找属于自己的节奏。"
            </p>
          </div>
        </div>

        {/* Skills */}
        <div className="animate-in mb-20">
          <h3 className="font-serif text-xl text-[#f4f1ea] mb-6">技能标签</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="font-sans text-sm text-[#d5cfc1] border border-white/10 px-4 py-2 rounded-full hover:border-[#c8a265]/40 hover:text-[#c8a265] transition-all duration-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="animate-in mb-20">
          <h3 className="font-serif text-xl text-[#f4f1ea] mb-6">兴趣爱好</h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <span
                key={interest}
                className="font-sans text-sm text-[#d5cfc1] bg-white/5 px-4 py-2 rounded-full hover:bg-[#c8a265]/10 hover:text-[#c8a265] transition-all duration-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="animate-in">
          <h3 className="font-serif text-xl text-[#f4f1ea] mb-6">联系方式</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#c8a265] w-20">EMAIL</span>
              <span className="font-sans text-sm text-[#d5cfc1]">jikwxz@outlook.com</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#c8a265] w-20">WEIBO</span>
              <span className="font-sans text-sm text-[#d5cfc1]">@流失的浮华</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#c8a265] w-20">INSTAGRAM</span>
              <span className="font-sans text-sm text-[#d5cfc1]">@liushidefuhua</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
