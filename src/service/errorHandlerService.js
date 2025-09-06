import { navigateToLogin } from './navigationService';

/**
 * Handles API errors and navigates to login if unauthorized
 * @param {Error} error - The error object from API call
 * @returns {Promise<never>} - Re-throws the error for local handling
 */
export async function handleApiError(error) {
        
  // Check if error message contains "Unauthorized" (case insensitive)
  if (error.message && typeof error.message === "string" && error.message.toLowerCase().includes('Unauthorized')) {
    // Navigate to login page
    navigateToLogin();
  }
  
  // Re-throw the error for local component handling
  throw error;
}
