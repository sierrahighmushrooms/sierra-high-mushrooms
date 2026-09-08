import type {ReactNode} from 'react';
import {Children, isValidElement} from 'react';
import {useReveal, type RevealState} from '~/hooks/useReveal';
import styles from './ScrollReveal.module.css';

function revealClass(state: RevealState) {
  if (state === 'hidden') return styles.hidden;
  if (state === 'visible') return styles.visible;
  return '';
}

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

/**
 * Fades + slides a single block in when it scrolls into view.
 * Progressive enhancement: content is visible by default (see useReveal).
 */
export function ScrollReveal({children, className}: ScrollRevealProps) {
  const {ref, state} = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${revealClass(state)} ${className || ''}`}
    >
      {children}
    </div>
  );
}

interface ScrollRevealStaggerProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}

/**
 * Fades + slides each direct child in with a staggered delay when the group
 * scrolls into view. Visible by default; animates only after enhancement.
 */
export function ScrollRevealStagger({
  children,
  className,
  staggerMs = 90,
}: ScrollRevealStaggerProps) {
  const {ref, state} = useReveal<HTMLDivElement>();
  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, index) => {
        const style =
          state === 'visible'
            ? {transitionDelay: `${index * staggerMs}ms`}
            : undefined;
        const key = isValidElement(child) ? (child.key ?? index) : index;

        return (
          <div
            key={key}
            className={`${styles.reveal} ${revealClass(state)}`}
            style={style}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
