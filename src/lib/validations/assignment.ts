import Joi from "joi";
import { type CandidateLevel } from "@/types/modules/candidates";
import { CandidateValidationMessage } from "@/types/modules";

export type AssignmentFormData = {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: CandidateLevel;
};

const CANDIDATE_LEVELS: CandidateLevel[] = [
  "Junior",
  "Middle",
  "Senior",
  "Principal",
];

export const assignmentFormSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.base": CandidateValidationMessage.NAME_WRONG,
    "string.empty": CandidateValidationMessage.NAME_REQUIRED,
    "any.required": CandidateValidationMessage.NAME_REQUIRED,
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": CandidateValidationMessage.EMAIL_WRONG,
      "string.empty": CandidateValidationMessage.EMAIL_REQUIRED,
      "any.required": CandidateValidationMessage.EMAIL_REQUIRED,
    }),

  assignment_description: Joi.string().min(10).required().messages({
    "string.base": CandidateValidationMessage.ASSIGNMENT_DESCRIPTION_WRONG,
    "string.empty": CandidateValidationMessage.ASSIGNMENT_DESCRIPTION_REQUIRED,
    "string.min": CandidateValidationMessage.ASSIGNMENT_DESCRIPTION_MIN_LENGTH,
    "any.required": CandidateValidationMessage.ASSIGNMENT_DESCRIPTION_REQUIRED,
  }),

  github_repo_url: Joi.string().uri().required().messages({
    "string.uri": CandidateValidationMessage.GITHUB_REPO_URL_WRONG,
    "string.empty": CandidateValidationMessage.GITHUB_REPO_URL_REQUIRED,
    "any.required": CandidateValidationMessage.GITHUB_REPO_URL_REQUIRED,
  }),

  candidate_level: Joi.string()
    .valid(...CANDIDATE_LEVELS)
    .required()
    .messages({
      "any.only": CandidateValidationMessage.CANDIDATE_LEVEL_WRONG,
      "any.required": CandidateValidationMessage.CANDIDATE_LEVEL_REQUIRED,
    }),
});
