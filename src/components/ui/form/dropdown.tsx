"use client";

import { FormFieldProps } from "@/types/form/form-field";

type Option = {
  value: string;
  label: string;
};

type DropdownProps = FormFieldProps & {
  options: Option[];
};

export const DropdownField = ({
  name,
  placeholder,
  register,
  options,
}: DropdownProps) => {
  return (
    <select
      {...register(name)}
      id={name}
      name={name}
      aria-label={name}
      className="block w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-base"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
