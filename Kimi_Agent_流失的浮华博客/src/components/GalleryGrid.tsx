import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
  { src: '/images/still-life.jpg', title: '旧时光的温度', date: '2024.10', offset: { x: '5%', y: '10%', rotate: -3 } },
  { src: '/images/fashion-back.jpg', title: '风中的轮廓', date: '2024.09', offset: { x: '55%', y: '5%', rotate: 2 } },
  { src: '/images/mountain-mist.jpg', title: '晨雾中的峡谷', date: '2024.08', offset: { x: '15%', y: '50%', rotate: -2 } },
  { src: '/images/still-life.jpg', title: '午后的咖啡渍', date: '2024.07', offset: { x: '60%', y: '45%', rotate: 3 } },
  { src: '/images/fashion-back.jpg', title: '背影的温度', date: '2024.05', offset: { x: '35%', y: '25%', rotate: -1 } },
];

export default function GalleryGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = cardsRef.current.filter(Boolean);

    const triggers: ScrollTrigger[] = [];

    cards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 60, scale: 0.9 });

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.15,
            ease: 'power3.out',
          });
        },
      });
      triggers.push(st);
    });

    // Hover distortion effect
    let mouseTrail: { x: number; y: number; vx: number; vy: number; time: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      mouseTrail.push({
        x: e.clientX,
        y: e.clientY,
        vx: e.movementX,
        vy: e.movementY,
        time: Date.now(),
      });

      if (mouseTrail.length > 15) mouseTrail.shift();

      const speed = Math.sqrt(e.movementX ** 2 + e.movementY ** 2);

      cards.forEach((card) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dist = Math.sqrt((e.clientX - cx) ** 2 + (e.clientY - cy) ** 2);

        if (dist < 200 && speed > 3) {
          const strength = Math.min(speed / 30, 1);
          const rgbShift = strength * 6;
          card.style.filter = `saturate(${1.2 + strength * 0.8}) brightness(${1 + strength * 0.15})`;
          card.style.boxShadow = `
            ${rgbShift}px 0 ${12 + strength * 20}px rgba(200, 162, 101, ${0.2 + strength * 0.3}),
            -${rgbShift}px 0 ${12 + strength * 20}px rgba(200, 162, 101, ${0.2 + strength * 0.3}),
            0 ${8 + strength * 12}px ${30 + strength * 40}px rgba(0, 0, 0, ${0.6 + strength * 0.2})
          `;
        } else {
          card.style.filter = 'saturate(1) brightness(1)';
          card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.6)';
        }
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      triggers.forEach((t) => t.kill());
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-[#0a0a0a] py-24 md:py-40 relative" style={{ minHeight: '100vh' }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mb-16 md:mb-24">
        <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
          Moments / 片刻定格
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-[#f4f1ea] tracking-tight">
          影像碎片
        </h2>
      </div>

      <div className="relative" style={{ height: '80vh', maxWidth: '1400px', margin: '0 auto' }}>
        {galleryItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className="absolute"
            style={{
              left: item.offset.x,
              top: item.offset.y,
              transform: `rotate(${item.offset.rotate}deg)`,
              width: index === 4 ? '28%' : index === 2 ? '32%' : '26%',
              zIndex: index === 4 ? 5 : index,
              transition: 'filter 0.15s ease, box-shadow 0.15s ease',
            }}
          >
            <Link to="/photos" className="block">
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)',
                }}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: index === 1 || index === 5 ? '3/4' : '4/3' }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <span className="font-serif text-sm text-[#f4f1ea]">{item.title}</span>
                <span className="font-mono text-xs text-[#d5cfc1]/50">{item.date}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <Link
          to="/photos"
          className="inline-block font-mono text-xs text-[#c8a265] tracking-widest uppercase border border-[#c8a265]/30 px-8 py-3 rounded-full hover:bg-[#c8a265]/10 transition-all duration-300"
        >
          View All Photos
        </Link>
      </div>
    </section>
  );
}
