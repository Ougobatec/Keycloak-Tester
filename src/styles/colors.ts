// Global color definitions for consistent theming across components

export type ColorName =
  | 'blue'
  | 'purple'
  | 'teal'
  | 'emerald'
  | 'red'
  | 'transparent';

// Icon box and button gradient backgrounds
export const gradientColors: Record<ColorName, string> = {
  blue: 'bg-linear-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20',
  purple:
    'bg-linear-to-br from-purple-600 to-purple-700 shadow-lg shadow-purple-500/20',
  teal: 'bg-linear-to-br from-teal-600 to-teal-700 shadow-lg shadow-teal-500/20',
  emerald:
    'bg-linear-to-br from-emerald-600 to-emerald-700 shadow-lg shadow-emerald-500/20',
  red: 'bg-linear-to-br from-red-600 to-red-700 shadow-lg shadow-red-500/20',
  transparent: 'bg-white/5',
};

// Hover states for buttons
export const gradientHoverColors: Record<ColorName, string> = {
  blue: 'hover:from-blue-700 hover:to-blue-800',
  purple: 'hover:from-purple-700 hover:to-purple-800',
  teal: 'hover:from-teal-700 hover:to-teal-800',
  emerald: 'hover:from-emerald-700 hover:to-emerald-800',
  red: 'hover:from-red-700 hover:to-red-800',
  transparent: 'hover:bg-white/10',
};

// Border colors for GlassPanel and Button
export const borderColors: Record<ColorName, string> = {
  blue: 'border-blue-500/40',
  purple: 'border-purple-500/40',
  teal: 'border-teal-500/40',
  emerald: 'border-emerald-500/40',
  red: 'border-red-500/40',
  transparent: 'border-white/10',
};
