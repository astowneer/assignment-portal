import React from "react";
import { FormFieldProps } from "@/types/form/form-field";

type TextAreaProps = FormFieldProps & {
  rows?: number;
};

export const TextAreaField = ({
  name,
  placeholder,
  register,
  rows = 4,
}: TextAreaProps) => {
  return (
    <textarea
      id={name}
      {...register(name)}
      rows={rows}
      placeholder={placeholder}
      className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-base"
      aria-label={name}
    />
  );
};
