function logout() {
  // Clear the token from the local storage
  localStorage.removeItem('token');
  // Redirect to the login page
  window.location.href = '/login';
}

export { logout };