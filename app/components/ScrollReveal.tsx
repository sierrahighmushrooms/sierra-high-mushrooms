import type {ReactNode} from 'react';
import {Children, cloneElement, isValidElement} from 'react';
import {useInView} from '~/hooks/useInView';
import styles from './ScrollReveal.module.css';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

/** Fades + slides a single block in when it scrolls into view. */
export function ScrollReveal({
  children,
  className,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const {ref, isInView} = useInView<HTMLDivElement>();

  return (
    <Tag
      ref={ref as never}
      className={`${styles.reveal} ${isInView ? styles.visible : ''} ${className || ''}`}
    >
      {children}
    </Tag>
  );
}

interface ScrollRevealStaggerProps {
  children: ReactNode;
  className?: string;
  staggerMs?: number;
}

/** Fades + slides each direct child in with a staggered delay when the group scrolls into view. */
export function ScrollRevealStagger({
  children,
  className,
  staggerMs = 90,
}: ScrollRevealStaggerProps) {
  const {ref, isInView} = useInView<HTMLDivElement>();
  const items = Children.toArray(children);

  return (
    <div ref={ref} className={className}>
      {items.map((child, index) => {
        const style = {transitionDelay: isInView ? `${index * staggerMs}ms` : '0ms'};

        if (isValidElement(child)) {
          return (
            <div
              key={child.key ?? index}
              className={`${styles.staggerItem} ${isInView ? styles.visible : ''}`}
              style={style}
            >
              {child}
            </div>
          );
        }

        return (
          <div
            key={index}
            className={`${styles.staggerItem} ${isInView ? styles.visible : ''}`}
            style={style}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
