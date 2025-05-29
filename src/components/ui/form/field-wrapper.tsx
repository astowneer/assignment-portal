import { Error } from "./error";
import { Label } from "./label";
import { type FieldError } from "react-hook-form";

type FieldWrapperProps = {
  required?: boolean;
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  "className" | "children"
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children, required } = props;
  return (
    <div>
      <Label>
        {label} {required && <span className="text-gray-500">*</span>}
        <div className="mt-1">{children}</div>
      </Label>
      <div className="mt-2 min-h-[22px]">
        <Error errorMessage={error?.message} />
      </div>
    </div>
  );
};
