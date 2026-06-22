import type { ReactNode } from 'react';

interface BackdropProps {
  onClick?: () => void;
  children?: ReactNode;
}

export function Backdrop({ onClick, children }: BackdropProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClick}
    >
      <div
        className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
        aria-hidden="true"
      />
      {children}
    </div>
  );
}
