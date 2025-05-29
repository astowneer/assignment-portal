"use client";

import {
  AssignmentFormData,
  assignmentFormSchema,
} from "@/lib/validations/assignment";
import { useAppForm } from "@/lib/hooks/use-app-form";
import { submitAssignment } from "../_actions/submit-assignment";
import {
  InputField,
  TextAreaField,
  DropdownField,
  FieldWrapper,
} from "@/components/ui/form";
import { mapObjectsToOptions } from "@/utils";
import { DefaultCandidatePayload } from "@/types/modules/candidates";
import { type CandidateLevel } from "@/types/modules/candidates";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type AssignmentFormProps = {
  candidateLevels: {
    levels: CandidateLevel[];
  };
};

const ToastMessages = {
  SUCCESS: "Assignment submitted successfully!",
  GENERIC_ERROR: "Failed to submit assignment!",
};

export function AssignmentForm({ candidateLevels }: AssignmentFormProps) {
  const router = useRouter();

  const { control, errors, handleSubmit } = useAppForm<AssignmentFormData>({
    validationSchema: assignmentFormSchema,
    mode: "onTouched",
    defaultValues: DefaultCandidatePayload,
  });

  const onSubmit = handleSubmit(async (formData) => {
    const result = await submitAssignment(formData);
    if (!result.success) {
      toast(ToastMessages.GENERIC_ERROR);
    } else {
      toast(ToastMessages.SUCCESS);
      router.push("/thank-you");
    }
  });

  const candidateLevelsOptions = mapObjectsToOptions(
    candidateLevels.levels,
    (name) => name,
    (value) => value
  );

  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <FieldWrapper label="Name" error={errors.name} required>
        <InputField
          register={control.register}
          name="name"
          type="text"
          placeholder="Enter your name"
        />
      </FieldWrapper>

      <FieldWrapper label="Email" error={errors.email} required>
        <InputField
          register={control.register}
          name="email"
          type="email"
          placeholder="Enter your email"
        />
      </FieldWrapper>

      <FieldWrapper
        label="Assignment Description"
        error={errors.assignment_description}
        required
      >
        <TextAreaField
          register={control.register}
          name="assignment_description"
          placeholder="Enter your assignment description"
          rows={4}
        />
      </FieldWrapper>

      <FieldWrapper
        label="GitHub Repository URL"
        error={errors.github_repo_url}
        required
      >
        <InputField
          register={control.register}
          name="github_repo_url"
          type="url"
          placeholder="Enter your GitHub repository URL"
        />
      </FieldWrapper>

      <FieldWrapper
        label="Candidate Level"
        error={errors.candidate_level}
        required
      >
        <DropdownField
          register={control.register}
          name="candidate_level"
          placeholder="Select a level"
          options={candidateLevelsOptions}
        />
      </FieldWrapper>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit Assignment
      </button>
    </form>
  );
}
