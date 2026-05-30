import { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { movies, movieGenres } from '@/data/movies';

gsap.registerPlugin(ScrollTrigger);

export default function MoviesPage() {
  const [activeGenre, setActiveGenre] = useState('全部');
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredMovies =
    activeGenre === '全部'
      ? movies
      : movies.filter((m) => m.genre === activeGenre);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.movie-card');
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
  }, [activeGenre]);

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] pt-32 md:pt-40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 pb-32">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
            Cinema / 影视
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#f4f1ea] tracking-tight">
            光影之间
          </h1>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {movieGenres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`font-mono text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                activeGenre === genre
                  ? 'border-[#c8a265] text-[#c8a265] bg-[#c8a265]/10'
                  : 'border-white/10 text-[#d5cfc1] hover:border-[#c8a265]/40 hover:text-[#c8a265]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movie Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-1 bg-[#0a0a0a]/60 backdrop-blur-sm px-2 py-1 rounded">
                  <Star className="w-3 h-3 text-[#c8a265] fill-[#c8a265]" />
                  <span className="font-mono text-xs text-[#f4f1ea]">{movie.rating}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs text-[#c8a265]">{movie.genre}</span>
                    <span className="font-mono text-xs text-[#d5cfc1]/40">{movie.year}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#f4f1ea] mb-1">
                    {movie.title}
                  </h3>
                  <p className="font-sans text-xs text-[#d5cfc1]/50">
                    {movie.originalTitle} / {movie.director}
                  </p>
                </div>
              </div>

              <p className="font-sans text-sm text-[#d5cfc1]/70 leading-relaxed line-clamp-2 mb-3">
                {movie.synopsis}
              </p>

              <div className="glass-container" style={{ padding: '20px' }}>
                <div className="glass-edge" />
                <div className="glass-content">
                  <p className="font-mono text-xs text-[#c8a265] mb-2">观后感</p>
                  <p className="font-sans text-sm text-[#d5cfc1]/80 leading-relaxed">
                    {movie.review}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-3">
                {movie.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs text-[#d5cfc1]/30"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
