import { IResponseError } from '@/models/response.model';
import axios from 'axios';

// Error handler
export const getErrorMessage = (error: unknown): string => {
  const message = 'Failed to process the request';

  // If it's an Axios error
  if (axios.isAxiosError(error)) {
    const serverResponse = error.response?.data as IResponseError | undefined;

    // If the server response contains a message
    if (serverResponse && serverResponse.message) {
      return serverResponse.message;
    } else {
      // Return Axios default noftification
      return error.message;
    }
  } else if (error instanceof Error) {
    // If it's a generic JavaScript Error, return its default message.
    return error.message;
  }

  return message;
};
