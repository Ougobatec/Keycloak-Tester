import type { ReactNode } from 'react';
import { type ColorName, gradientColors, borderColors } from '../styles/colors';

interface IconBoxProps {
  children: ReactNode;
  color?: ColorName;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-3',
};

export function IconBox({
  children,
  color = 'default',
  size = 'md',
}: IconBoxProps) {
  return (
    <div
      className={`${gradientColors[color]} border ${borderColors[color]} ${sizes[size]} rounded-lg text-white`}
    >
      {children}
    </div>
  );
}
