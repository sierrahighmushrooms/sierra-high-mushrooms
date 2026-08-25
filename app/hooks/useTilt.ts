import {useRef, useState} from 'react';

interface TiltOptions {
  /** Max rotation in degrees on each axis. */
  maxRotation?: number;
  /** CSS perspective distance, applied inline so no parent wrapper is needed. */
  perspective?: number;
  /** Px to lift the element while hovered. */
  lift?: number;
}

/**
 * 3D tilt-on-mousemove effect. Rotation is derived from cursor position
 * relative to the element's center, clamped to ±maxRotation degrees.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  maxRotation = 8,
  perspective = 700,
  lift = 2,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const restingTransform = `perspective(${perspective}px) rotateY(0deg) rotateX(0deg) translateY(0)`;
  const [transform, setTransform] = useState(restingTransform);

  const handleMouseMove = (event: React.MouseEvent<T>) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    setTransform(
      `perspective(${perspective}px) rotateY(${x * maxRotation}deg) rotateX(${
        -y * maxRotation
      }deg) translateY(-${lift}px)`,
    );
  };

  const handleMouseLeave = () => {
    setTransform(restingTransform);
  };

  return {ref, transform, handleMouseMove, handleMouseLeave};
}
