import type { ReactNode } from 'react';
import {
  type ColorName,
  borderColors as globalBorderColors,
  backgroundColors,
} from '../styles/colors';

interface GlassPanelProps {
  children: ReactNode;
  borderColor?: ColorName;
  border?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  className?: string;
}

const paddings = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const roundedSizes = {
  none: 'rounded-none',
  sm: 'rounded',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full',
};

export function GlassPanel({
  children,
  borderColor = 'default',
  border = 'border',
  padding = 'md',
  rounded = 'md',
  className = '',
}: GlassPanelProps) {
  return (
    <div
      className={`${backgroundColors.panel} backdrop-blur-lg ${border} ${globalBorderColors[borderColor]} ${paddings[padding]} ${roundedSizes[rounded]} ${className}`}
    >
      {children}
    </div>
  );
}
