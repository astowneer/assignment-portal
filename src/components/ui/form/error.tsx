"use client";

export type ErrorProps = {
  errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
  if (!errorMessage) return null;

  return (
    <div
      role="alert"
      aria-label={errorMessage}
      className="text-xs font-semibold text-red-500"
    >
      {errorMessage}
    </div>
  );
};
