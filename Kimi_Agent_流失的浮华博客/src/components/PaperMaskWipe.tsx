import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PaperMaskWipe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealMaskRef = useRef<SVGPathElement>(null);
  const parallaxMaskRef = useRef<SVGPathElement>(null);
  const revealInnerRef = useRef<HTMLDivElement>(null);
  const parallaxInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const revealMask = revealMaskRef.current;
    const parallaxMask = parallaxMaskRef.current;
    const revealInner = revealInnerRef.current;
    const parallaxInner = parallaxInnerRef.current;
    if (!container || !revealMask || !parallaxMask || !revealInner || !parallaxInner) return;

    const pageHeight = window.innerHeight;
    const width = window.innerWidth;

    const jaggedPath = `M 0 0 H ${width} V ${pageHeight * 0.1} L ${width * 0.95} ${pageHeight * 0.08} L ${width} ${pageHeight * 0.15} L ${width * 0.9} ${pageHeight * 0.2} L ${width} ${pageHeight * 0.3} L ${width * 0.92} ${pageHeight * 0.35} L ${width} ${pageHeight * 0.5} L ${width * 0.88} ${pageHeight * 0.55} L ${width} ${pageHeight * 0.7} L ${width * 0.94} ${pageHeight * 0.75} L ${width} ${pageHeight * 0.9} L ${width * 0.96} ${pageHeight * 0.95} V ${pageHeight} H 0 Z`;

    const fullPath = `M 0 0 H ${width} V ${pageHeight} H 0 Z`;

    gsap.set(revealMask, { attr: { d: jaggedPath } });
    gsap.set(parallaxMask, { attr: { d: jaggedPath } });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        pin: true,
      },
    });

    tl.to(
      revealMask,
      { ease: 'power3.out', attr: { d: fullPath }, duration: 1 },
      0
    );
    tl.to(
      parallaxMask,
      { ease: 'power3.out', attr: { d: fullPath }, duration: 1 },
      0
    );
    tl.to(revealInner, { yPercent: -15, duration: 1, ease: 'power2.inOut' }, 0.05);
    tl.to(parallaxInner, { yPercent: 15, duration: 1, ease: 'power1.inOut' }, 0.05);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="w-full bg-[#0a0a0a]">
      <div className="py-24 md:py-40 px-6 md:px-12 max-w-[1400px] mx-auto">
        <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
          Featured / 精选专题
        </p>
        <h2 className="font-serif text-3xl md:text-5xl text-[#f4f1ea] tracking-tight">
          浮光掠影
        </h2>
      </div>

      <div
        ref={containerRef}
        className="reveal-container"
        style={{
          position: 'relative',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {/* Reveal layer (bottom) */}
        <div
          className="reveal-mask"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth : 1920} ${typeof window !== 'undefined' ? window.innerHeight : 1080}`}
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id="revealClip">
                <path ref={revealMaskRef} d="" shapeRendering="geometricPrecision" />
              </clipPath>
            </defs>
            <foreignObject width="100%" height="100%" clipPath="url(#revealClip)">
              <div
                ref={revealInnerRef}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url(/images/still-life.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </foreignObject>
          </svg>
        </div>

        {/* Parallax layer (top) */}
        <div
          className="parallax-container"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth : 1920} ${typeof window !== 'undefined' ? window.innerHeight : 1080}`}
            preserveAspectRatio="none"
          >
            <defs>
              <clipPath id="parallaxClip">
                <path ref={parallaxMaskRef} d="" shapeRendering="geometricPrecision" />
              </clipPath>
            </defs>
            <foreignObject width="100%" height="100%" clipPath="url(#parallaxClip)">
              <div
                ref={parallaxInnerRef}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: 'url(/images/mountain-mist.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div className="glass-container max-w-lg mx-6">
                  <div className="glass-edge" />
                  <div className="glass-highlight" />
                  <div className="glass-content text-center">
                    <p className="font-mono text-xs text-[#c8a265] tracking-widest uppercase mb-4">
                      2024 年度精选
                    </p>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#f4f1ea] mb-4">
                      在时间的褶皱里寻找光
                    </h3>
                    <p className="font-sans text-sm text-[#d5cfc1] leading-relaxed">
                      这一年，走过了七个国家，三十六座城市。拍下了四千多张照片，却觉得每一张都不够好。写下了十二万字，最后留下的，只是这几篇。
                    </p>
                  </div>
                </div>
              </div>
            </foreignObject>
          </svg>
        </div>
      </div>
    </section>
  );
}
