import { IconBox } from './IconBox';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const iconSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const textSizes = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
};

export function Logo({ size = 'md', showText = true }: LogoProps) {
  return (
    <div className="flex items-center gap-3">
      <IconBox color="blue" size={size}>
        <svg
          className={`${iconSizes[size]}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      </IconBox>
      {showText && (
        <h1 className={`${textSizes[size]} font-semibold text-white`}>
          Keycloak{' '}
          <span className="font-light bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tester
          </span>
        </h1>
      )}
    </div>
  );
}
