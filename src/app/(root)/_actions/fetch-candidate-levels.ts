"use server";

import { ApiEndpoints } from "@/config/api";
import { type CandidateLevel } from "@/types/modules/candidates";
import { HttpContentType, HttpHeader } from "@/types/http";
import { logError } from "@/utils";

const CandidateLevelsMessages = {
  SUCCESS: "Candidate levels fetched successfully.",
  GENERIC_ERROR: "Failed to fetch candidate levels.",
  INVALID_RESPONSE_FORMAT: "Invalid response format.",
};

type CandidateLevelsResponse =
  | { success: true; levels: CandidateLevel[] }
  | { success: false; error: string };

export async function fetchCandidateLevels(): Promise<CandidateLevelsResponse> {
  try {
    const response = await fetch(ApiEndpoints.CANDIDATE_LEVELS, {
      headers: { [HttpHeader.CONTENT_TYPE]: HttpContentType.JSON },
    });
    console.log(ApiEndpoints.CANDIDATE_LEVELS)
    if (!response.ok) {
      return {
        success: false,
        error: CandidateLevelsMessages.GENERIC_ERROR,
      };
    }

    const json = await response.json();

    if (!json.levels || !Array.isArray(json.levels)) {
      return {
        success: false,
        error: CandidateLevelsMessages.INVALID_RESPONSE_FORMAT,
      };
    }

    return {
      success: true,
      levels: json.levels,
    };
  } catch (error) {
    logError(error);
    return {
      success: false,
      error: CandidateLevelsMessages.GENERIC_ERROR,
    };
  }
}
