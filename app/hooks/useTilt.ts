import {useRef, useState} from 'react';

/**
 * 3D tilt-on-mousemove effect. Rotation is derived from cursor position
 * relative to the element's center, clamped to ±maxRotation degrees.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(
  maxRotation = 15,
) {
  const ref = useRef<T>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (event: React.MouseEvent<T>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * maxRotation * 2;
    const rotateX = -y * maxRotation * 2;

    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg)');
  };

  return {ref, transform, handleMouseMove, handleMouseLeave};
}
