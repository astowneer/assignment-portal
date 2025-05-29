import { CandidateValidationRule } from "./candidate-validation-rule";

const CandidateValidationMessage = {
  NAME_REQUIRED: "Name is required",
  NAME_WRONG: "Name must be a string.",
  EMAIL_REQUIRED: "Email is required",
  EMAIL_WRONG: "Email must be a valid email address.",
  ASSIGNMENT_DESCRIPTION_REQUIRED: "Assignment description is required",
  ASSIGNMENT_DESCRIPTION_WRONG: "Assignment description must be a string.",
  ASSIGNMENT_DESCRIPTION_MIN_LENGTH: `Assignment description must be at least ${CandidateValidationRule.ASSIGNMENT_DESCRIPTION_MIN_LENGTH} characters.`,
  GITHUB_REPO_URL_REQUIRED: "GitHub repository URL is required",
  GITHUB_REPO_URL_WRONG: "GitHub repository URL must be a valid URL.",
  CANDIDATE_LEVEL_REQUIRED: "Candidate level is required",
  CANDIDATE_LEVEL_WRONG:
    "Candidate level must be one of Junior, Middle, Senior or Principal.",
} as const;

export { CandidateValidationMessage };
