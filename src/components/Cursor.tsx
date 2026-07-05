import { useEffect, useState } from 'react';

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-enabled
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    let rafId: number;
    let targetX = -100;
    let targetY = -100;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const updatePosition = () => {
      setPosition(prev => {
        // Linear interpolation for slight lag (smoothness)
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        return {
          x: prev.x + dx * 0.2,
          y: prev.y + dy * 0.2
        };
      });
      rafId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    
    rafId = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div 
      className="fixed top-0 left-0 w-[14px] h-[14px] pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
    >
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E85002] transform -translate-y-1/2 opacity-70"></div>
      <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#E85002] transform -translate-x-1/2 opacity-70"></div>
      <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-[#E85002] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}
