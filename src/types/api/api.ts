import { ValueOf } from "@/utils";

type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
  success: boolean;
};

type ApiError = {
  code: ValueOf<typeof API_ERROR_CODE>;
  message: string;
};

const API_ERROR_CODE = {
  FETCH_ERROR: "FETCH_ERROR",
  INVALID_RESPONSE: "INVALID_RESPONSE",
  NETWORK_ERROR: "NETWORK_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  INVALID_REQUEST: "INVALID_REQUEST",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  TIMEOUT_ERROR: "TIMEOUT_ERROR",
} as const;

export { type ApiResponse, type ApiError, API_ERROR_CODE };
