interface ToastProps {
  message: string | null;
  color?: 'green' | 'red' | 'blue' | 'teal' | 'purple';
}

const colorStyles = {
  green: {
    border: 'border-green-500/40',
    bgIcon: 'bg-green-500/20',
    textIcon: 'text-green-400',
  },
  red: {
    border: 'border-red-500/40',
    bgIcon: 'bg-red-500/20',
    textIcon: 'text-red-400',
  },
  blue: {
    border: 'border-blue-500/40',
    bgIcon: 'bg-blue-500/20',
    textIcon: 'text-blue-400',
  },
  teal: {
    border: 'border-teal-500/40',
    bgIcon: 'bg-teal-500/20',
    textIcon: 'text-teal-400',
  },
  purple: {
    border: 'border-purple-500/40',
    bgIcon: 'bg-purple-500/20',
    textIcon: 'text-purple-400',
  },
};

export function Toast({ message, color = 'green' }: ToastProps) {
  if (!message) return null;

  const styles = colorStyles[color];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div
        className={`bg-slate-800/30 backdrop-blur-md border ${styles.border} rounded-lg p-4 shadow-2xl max-w-sm`}
      >
        <div className="flex items-center gap-3">
          <div className={`${styles.bgIcon} p-2 rounded-lg`}>
            <svg
              className={`w-5 h-5 ${styles.textIcon}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-white font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
}
