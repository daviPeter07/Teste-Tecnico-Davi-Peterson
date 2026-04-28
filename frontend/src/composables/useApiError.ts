import axios from "axios";

interface ErrorPayload {
  message?: string;
}

export function useApiError() {
  function getApiErrorMessage(error: unknown, fallback: string): string {
    if (!axios.isAxiosError(error)) {
      return fallback;
    }

    const payload = error.response?.data as ErrorPayload | undefined;
    return payload?.message ?? fallback;
  }

  return {
    getApiErrorMessage,
  };
}
