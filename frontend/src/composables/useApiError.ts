import axios from "axios";
import type { ApiValidationErrorResponse } from "@/types/api";

export function useApiError() {
  const getApiErrorMessage = (
    error: unknown,
    fallbackMessage = "Ocorreu um erro inesperado.",
  ) => {
    if (!axios.isAxiosError<ApiValidationErrorResponse>(error)) {
      return fallbackMessage;
    }

    const responseData = error.response?.data;

    if (!responseData) {
      return fallbackMessage;
    }

    const firstFieldErrors = responseData.errors
      ? Object.values(responseData.errors)[0]
      : undefined;

    if (firstFieldErrors?.length) {
      return firstFieldErrors[0];
    }

    return responseData.message ?? fallbackMessage;
  };

  return {
    getApiErrorMessage,
  };
}
