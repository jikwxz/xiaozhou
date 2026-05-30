import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { articles } from '@/data/articles';

gsap.registerPlugin(ScrollTrigger);

export default function ArchiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const gridItems = [...grid.querySelectorAll('.grid__item')] as HTMLElement[];

    const triggers: ScrollTrigger[] = [];

    gridItems.forEach((item, index) => {
      const image = item.querySelector('.grid__item-image') as HTMLElement;
      if (!image) return;

      if (index % 2 === 0) {
        const tl = gsap.to(image, {
          ease: 'none',
          startAt: { scale: 1.2 },
          scale: 1,
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      } else {
        const dataSpeed = parseFloat(item.dataset.speed || '1');
        const tl = gsap.to(item, {
          yPercent: -100 * dataSpeed,
          ease: 'none',
          scrollTrigger: {
            trigger: item,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section className="w-full bg-[#0a0a0a] py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <h2 className="font-serif text-3xl md:text-5xl text-[#f4f1ea] tracking-tight">
          无尽归档
        </h2>
        <p className="font-mono text-xs text-[#c8a265] mt-3 tracking-widest uppercase">
          Archive / 2024
        </p>
      </div>

      <div
        ref={gridRef}
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          padding: '0 5vw',
        }}
      >
        {articles.slice(0, 6).map((article, index) => (
          <div
            key={article.id}
            className="grid__item will-change-transform"
            data-speed={index % 2 !== 0 ? '0.8' : '0'}
            style={{
              marginBottom: '25vh',
              marginTop: index % 2 === 0 ? '20vh' : 0,
              textAlign: index % 2 !== 0 ? 'right' : 'left',
            }}
          >
            <Link to={`/articles/${article.id}`}>
              <div
                className="grid__item-image"
                style={{
                  overflow: 'hidden',
                  borderRadius: '4px',
                  marginBottom: '1.5rem',
                }}
              >
                <div
                  className="grid__item-image-inner"
                  style={{
                    width: '100%',
                    height: index % 2 === 0 ? '450px' : '350px',
                    backgroundImage: `url(${article.coverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>

              <div className="flex items-center gap-3 mb-3" style={{ justifyContent: index % 2 !== 0 ? 'flex-end' : 'flex-start' }}>
                <span className="font-mono text-xs text-[#c8a265]">
                  {article.category}
                </span>
                <span className="w-8 h-px bg-[#d5cfc1]/20" />
                <span className="font-mono text-xs text-[#d5cfc1]/50">
                  {article.publishedAt}
                </span>
              </div>

              <h3 className="font-serif text-xl md:text-2xl text-[#f4f1ea] leading-snug mb-2 hover:text-[#c8a265] transition-colors duration-300">
                {article.title}
              </h3>

              <p className="font-sans text-sm text-[#d5cfc1]/70 leading-relaxed max-w-md" style={{ marginLeft: index % 2 !== 0 ? 'auto' : 0 }}>
                {article.excerpt}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link
          to="/articles"
          className="inline-block font-mono text-xs text-[#c8a265] tracking-widest uppercase border border-[#c8a265]/30 px-8 py-3 rounded-full hover:bg-[#c8a265]/10 transition-all duration-300"
        >
          View All Articles
        </Link>
      </div>
    </section>
  );
}
