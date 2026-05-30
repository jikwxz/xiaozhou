import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { photos, albums } from '@/data/photos';

gsap.registerPlugin(ScrollTrigger);

export default function PhotosPage() {
  const [activeAlbum, setActiveAlbum] = useState('全部');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredPhotos =
    activeAlbum === '全部'
      ? photos
      : photos.filter((p) => p.album === activeAlbum);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.photo-item');
    const triggers: ScrollTrigger[] = [];

    items.forEach((item, index) => {
      gsap.set(item, { opacity: 0, y: 50, scale: 0.95 });
      const st = ScrollTrigger.create({
        trigger: item,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(item, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: (index % 3) * 0.12,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(st);
    });

    return () => { triggers.forEach((t) => t.kill()); };
  }, [activeAlbum]);

  return (
    <main className="w-full min-h-screen bg-[#0a0a0a] pt-32 md:pt-40">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 pb-32">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
            Gallery / 影像
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#f4f1ea] tracking-tight">
            旅行照片
          </h1>
        </div>

        {/* Albums */}
        <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
          {albums.map((album) => (
            <button
              key={album}
              onClick={() => setActiveAlbum(album)}
              className={`font-mono text-xs tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300 ${
                activeAlbum === album
                  ? 'border-[#c8a265] text-[#c8a265] bg-[#c8a265]/10'
                  : 'border-white/10 text-[#d5cfc1] hover:border-[#c8a265]/40 hover:text-[#c8a265]'
              }`}
            >
              {album}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="photo-item break-inside-avoid"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="group relative overflow-hidden rounded-lg cursor-pointer">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <h3 className="font-serif text-base text-[#f4f1ea]">{photo.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-mono text-xs text-[#c8a265]">{photo.location}</span>
                    <span className="font-mono text-xs text-[#d5cfc1]/40">{photo.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] bg-[#0a0a0a]/95 flex items-center justify-center p-6 md:p-12"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-5xl max-h-full">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <h3 className="font-serif text-xl text-[#f4f1ea]">{selectedPhoto.title}</h3>
              <div className="flex items-center justify-center gap-3 mt-2">
                <span className="font-mono text-xs text-[#c8a265]">{selectedPhoto.location}</span>
                <span className="font-mono text-xs text-[#d5cfc1]/40">{selectedPhoto.date}</span>
                <span className="font-mono text-xs text-[#d5cfc1]/40">{selectedPhoto.album}</span>
              </div>
            </div>
            <button
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <span className="text-[#f4f1ea] text-lg">&times;</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
