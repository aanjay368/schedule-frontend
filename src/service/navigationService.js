// Navigation service to handle programmatic navigation
// This uses a simple approach since we can't use useNavigate() outside React components

let navigateFunction = null;

/**
 * Set the navigate function from React Router
 * This should be called from a React component that has access to useNavigate()
 * @param {Function} navigate - The navigate function from useNavigate()
 */
export function setNavigate(navigate) {
  navigateFunction = navigate;
}

export function navigateToLogin() {
  if (navigateFunction) {
    navigateFunction("/");
  } else {    
    window.location.href = "/";
  }
}

/**
 * Check if navigate function is available
 * @returns {boolean} - True if navigate function is set
 */
export function isNavigateAvailable() {
  return navigateFunction !== null;
}
