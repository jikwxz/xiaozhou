import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { articles, categories } from '@/data/articles';

gsap.registerPlugin(ScrollTrigger);

export default function ArticlesPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredArticles =
    activeCategory === '全部'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.article-card');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, index) => {
      gsap.set(item, { opacity: 0, y: 40 });
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 88%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: (index % 3) * 0.1,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(st);
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, [activeCategory]);

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] pt-32 md:pt-40">
      <div ref={sectionRef} className="max-w-[1200px] mx-auto px-6 md:px-12 pb-32">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
            Archive / 归档
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#f4f1ea] tracking-tight">
            无尽归档
          </h1>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                activeCategory === cat
                  ? 'border-[#c8a265] text-[#c8a265] bg-[#c8a265]/10'
                  : 'border-white/10 text-[#d5cfc1] hover:border-[#c8a265]/40 hover:text-[#c8a265]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`/articles/${article.id}`}
              className="article-card group"
            >
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="font-mono text-xs text-[#c8a265] bg-[#c8a265]/20 px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  <span className="font-mono text-xs text-[#d5cfc1]/60">
                    {article.readTime} min
                  </span>
                </div>
              </div>
              <h3 className="font-serif text-lg text-[#f4f1ea] mb-2 group-hover:text-[#c8a265] transition-colors duration-300">
                {article.title}
              </h3>
              <p className="font-sans text-sm text-[#d5cfc1]/60 leading-relaxed line-clamp-2 mb-3">
                {article.excerpt}
              </p>
              <div className="flex items-center gap-2">
                {article.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-[#d5cfc1]/40"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="font-mono text-xs text-[#d5cfc1]/30 mt-3">
                {article.publishedAt}
              </p>
            </Link>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-20">
            <p className="font-sans text-[#d5cfc1]/50">该分类下暂无文章</p>
          </div>
        )}
      </div>
    </main>
  );
}
