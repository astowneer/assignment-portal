import { CandidatePayloadKey } from "./candidate-payload-key";

const DefaultCandidatePayload = {
  [CandidatePayloadKey.NAME]: "",
  [CandidatePayloadKey.EMAIL]: "",
  [CandidatePayloadKey.ASSIGNMENT_DESCRIPTION]: "",
  [CandidatePayloadKey.GITHUB_REPO_URL]: "",
  [CandidatePayloadKey.CANDIDATE_LEVEL]: undefined,
};

export { DefaultCandidatePayload };
