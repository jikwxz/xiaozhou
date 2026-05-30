import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out',
      });

      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const onMouseEnterInteractive = () => {
      if (isHoveringRef.current) return;
      isHoveringRef.current = true;
      gsap.to(dot, { scale: 4, duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 1.5, opacity: 1, duration: 0.3, ease: 'power2.out' });
    };

    const onMouseLeaveInteractive = () => {
      isHoveringRef.current = false;
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(ring, { scale: 1, opacity: 0, duration: 0.3, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', onMouseMove);

    const observer = new MutationObserver(() => {
      bindInteractiveElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const bindInteractiveElements = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor-hover], .glass-container, .grid__item');
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    bindInteractiveElements();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#c8a265',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '1px solid rgba(200, 162, 101, 0.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
