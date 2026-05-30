import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { musicTracks } from '@/data/music';
import { movies } from '@/data/movies';

gsap.registerPlugin(ScrollTrigger);

export default function HomePreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.preview-item');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item) => {
      gsap.set(item, { opacity: 0, y: 40 });
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

  const featuredMusic = musicTracks.slice(0, 3);
  const featuredMovies = movies.slice(0, 3);

  return (
    <section ref={sectionRef} className="w-full bg-[#0a0a0a] py-24 md:py-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Music Preview */}
        <div className="mb-32 md:mb-48">
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-3">
                Music / 音乐分享
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#f4f1ea] tracking-tight">
                声之形
              </h2>
            </div>
            <Link
              to="/music"
              className="font-mono text-xs text-[#d5cfc1] tracking-widest hover:text-[#c8a265] transition-colors"
            >
              VIEW ALL &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredMusic.map((track) => (
              <div
                key={track.id}
                className="preview-item glass-container group"
                style={{ padding: '28px' }}
              >
                <div className="glass-edge" />
                <div className="glass-highlight" />
                <div className="glass-content">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-base text-[#f4f1ea] truncate group-hover:text-[#c8a265] transition-colors">
                        {track.title}
                      </h3>
                      <p className="font-sans text-sm text-[#d5cfc1]/70 mt-1">{track.artist}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-mono text-xs text-[#c8a265]">{track.tags[0]}</span>
                        <span className="font-mono text-xs text-[#d5cfc1]/40">{track.duration}</span>
                      </div>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-[#d5cfc1]/60 mt-4 leading-relaxed line-clamp-2">
                    {track.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Movies Preview */}
        <div>
          <div className="flex items-end justify-between mb-12 md:mb-16">
            <div>
              <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-3">
                Cinema / 影视分享
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-[#f4f1ea] tracking-tight">
                光影之间
              </h2>
            </div>
            <Link
              to="/movies"
              className="font-mono text-xs text-[#d5cfc1] tracking-widest hover:text-[#c8a265] transition-colors"
            >
              VIEW ALL &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {featuredMovies.map((movie) => (
              <div
                key={movie.id}
                className="preview-item group"
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-xs text-[#c8a265] bg-[#c8a265]/20 px-2 py-0.5 rounded">
                        {movie.rating}
                      </span>
                      <span className="font-mono text-xs text-[#d5cfc1]/60">{movie.genre}</span>
                    </div>
                    <h3 className="font-serif text-lg text-[#f4f1ea]">{movie.title}</h3>
                    <p className="font-sans text-xs text-[#d5cfc1]/60 mt-1">
                      {movie.director} / {movie.year}
                    </p>
                  </div>
                </div>
                <p className="font-sans text-sm text-[#d5cfc1]/60 leading-relaxed line-clamp-2">
                  {movie.review}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
