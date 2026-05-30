import { useState, useEffect, useRef } from 'react';
import { Play, Pause, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { musicTracks, musicCategories } from '@/data/music';

gsap.registerPlugin(ScrollTrigger);

export default function MusicPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredTracks =
    activeCategory === '全部'
      ? musicTracks
      : musicTracks.filter((t) => t.tags.includes(activeCategory));

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.music-card');
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
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-32">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
            Music / 音乐
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#f4f1ea] tracking-tight">
            声之形
          </h1>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {musicCategories.map((cat) => (
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

        {/* Music Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredTracks.map((track) => (
            <div key={track.id} className="music-card glass-container group" style={{ padding: '28px' }}>
              <div className="glass-edge" />
              <div className="glass-highlight" />
              <div className="glass-content">
                <div className="flex gap-4 mb-5">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                    <button
                      onClick={() => setPlayingId(playingId === track.id ? null : track.id)}
                      className="absolute inset-0 bg-[#0a0a0a]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      {playingId === track.id ? (
                        <Pause className="w-6 h-6 text-[#f4f1ea]" />
                      ) : (
                        <Play className="w-6 h-6 text-[#f4f1ea] ml-1" />
                      )}
                    </button>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-[#f4f1ea] truncate group-hover:text-[#c8a265] transition-colors">
                      {track.title}
                    </h3>
                    <p className="font-sans text-sm text-[#d5cfc1]/70 mt-1">{track.artist}</p>
                    <p className="font-mono text-xs text-[#d5cfc1]/40 mt-1">{track.album}</p>
                  </div>
                </div>

                <p className="font-sans text-sm text-[#d5cfc1]/60 leading-relaxed mb-4">
                  {track.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#c8a265] bg-[#c8a265]/10 px-2 py-0.5 rounded">
                      {track.tags[0]}
                    </span>
                    <span className="font-mono text-xs text-[#d5cfc1]/30">{track.duration}</span>
                  </div>
                  <button className="text-[#d5cfc1]/40 hover:text-[#c8a265] transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
