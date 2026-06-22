import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseInputProps {
  label?: string;
  className?: string;
}

interface TextInputProps
  extends
    Omit<InputHTMLAttributes<HTMLInputElement>, 'className'>,
    BaseInputProps {
  multiline?: false;
  rows?: never;
}

interface TextAreaProps
  extends
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'>,
    BaseInputProps {
  multiline: true;
}

export function TextInput({
  label,
  multiline,
  className = '',
  ...props
}: TextInputProps | TextAreaProps) {
  const inputClassName = `w-full bg-slate-900/50 border border-white/10 rounded-lg px-3 py-2 text-white/80 placeholder-white/40 focus:outline-none focus:border-white/20 transition ${className}`;
  const textareaClassName = `w-full bg-slate-900/50 border border-white/10 rounded-lg px-4 py-4 text-white/80 placeholder-white/40 focus:outline-none focus:border-white/20 transition resize-none scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent ${className}`;

  return (
    <div>
      {label && (
        <label className="block text-sm text-white/70 mb-1">{label}</label>
      )}
      {multiline ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={textareaClassName}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={inputClassName}
        />
      )}
    </div>
  );
}
