"use server";

import { ApiEndpoints } from "@/config/api";
import { AssignmentFormData } from "@/lib/validations/assignment";
import { HttpContentType, HttpHeader, HTTPMethod } from "@/types/http";
import { logError } from "@/utils";

const AssignmentMessages = {
  SUCCESS: "Assignment submitted successfully.",
  GENERIC_ERROR: "Failed to submit assignment.",
} as const;

type SubmitAssignmentResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitAssignment(
  formData: AssignmentFormData
): Promise<SubmitAssignmentResult> {
  try {
    const response = await fetch(ApiEndpoints.ASSIGNMENT, {
      method: HTTPMethod.POST,
      headers: { [HttpHeader.CONTENT_TYPE]: HttpContentType.JSON },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        success: false,
        error: errorText || AssignmentMessages.GENERIC_ERROR,
      };
    }

    return {
      success: true,
      message: AssignmentMessages.SUCCESS,
    };
  } catch (error) {
    logError(error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : AssignmentMessages.GENERIC_ERROR,
    };
  }
}
