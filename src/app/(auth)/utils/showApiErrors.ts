import { AxiosError } from "axios";
import { toast } from "react-hot-toast";

type ApiErrorResponse = {
  message?: string;
};

export function showApiError(error: unknown) {
  if (isAxiosError<ApiErrorResponse>(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (message) {
      toast.error(message);
      return;
    }

    if (status) {
      if (status === 400) toast.error("Invalid request. Please check your inputs.");
      else if (status === 401) toast.error("Invalid email or password.");
      else if (status === 403) toast.error("You are not authorized.");
      else if (status === 404) toast.error("Service not found.");
      else if (status === 409) toast.error("User already exists.");
      else if (status === 429) toast.error("Too many attempts. Please try later.");
      else if (status >= 500) toast.error("Server error. Please try again later.");
      else toast.error("An unknown server error occurred.");
      return;
    }
  }

  if (isNetworkError(error)) {
    toast.error("No internet connection. Please check your connection.");
    return;
  }

  toast.error("Something went wrong. Please try again.");
}

function isAxiosError<T = unknown>(error: unknown): error is AxiosError<T> {
  return (error as AxiosError)?.isAxiosError === true;
}

function isNetworkError(error: unknown): boolean {
  return (error as { code?: string })?.code === "ERR_NETWORK";
}
