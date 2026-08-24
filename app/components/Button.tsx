import type { ReactNode, ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

const variantMap = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
};

const sizeMap = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const variantClass = variantMap[variant];
  const sizeClass = sizeMap[size];

  return (
    <button
      className={`${variantClass} ${sizeClass} ${className || ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner} />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
