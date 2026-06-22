import type { ReactNode } from 'react';
import {
  type ColorName,
  gradientColors,
  gradientHoverColors,
  borderColors,
} from '../styles/colors';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  color?: ColorName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
};

export function Button({
  children,
  onClick,
  color = 'default',
  size = 'md',
  className = '',
}: ButtonProps) {
  const colorClass = `${gradientColors[color]} ${gradientHoverColors[color]} border ${borderColors[color]} text-white/90 hover:text-white`;

  return (
    <button
      onClick={onClick}
      className={`${colorClass} ${sizes[size]} rounded-lg font-medium transition flex items-center gap-2 cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
