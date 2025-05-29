import { UseFormRegister } from "react-hook-form";
import { AssignmentFormData } from "@/lib/validations/assignment";

type FormFieldProps = {
  name: keyof AssignmentFormData;
  type?: string;
  placeholder?: string;
  label?: string;
  error?: {
    message?: string;
  };
  register: UseFormRegister<AssignmentFormData>;
};

export type { FormFieldProps };
