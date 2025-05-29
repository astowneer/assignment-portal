import { FormFieldProps } from "@/types/form/form-field";

type InputProps = FormFieldProps;

export const InputField = ({
  name,
  type = "text",
  placeholder,
  register,
}: InputProps) => {
  return (
    <input
      id={name}
      {...register(name)}
      type={type}
      placeholder={placeholder}
      className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-base"
      aria-label={name}
    />
  );
};
