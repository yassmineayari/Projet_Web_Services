import { HttpException } from '@nestjs/common';
import { AxiosError } from 'axios';

export function rethrowHttpServiceError(error: unknown): never {
  if (error instanceof HttpException) {
    throw error;
  }

  const axiosError = error as AxiosError<{
    message?: string | string[];
    statusCode?: number;
  }>;

  if (axiosError.response) {
    const { status, data } = axiosError.response;
    const message = data?.message;
    const text = Array.isArray(message)
      ? message.join(', ')
      : message ?? axiosError.message;
    throw new HttpException(text, status);
  }

  throw error;
}
