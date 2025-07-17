export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const isStrongPassword = (password) => {
    
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return regex.test(password);
};

export const validateName = (name) => {
  return name.trim().length >= 2;
};

export const validateForm = (formData) => {
  const errors = {};
  
  if (!validateName(formData.firstName)) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  
  if (!validateName(formData.lastName)) {
    errors.lastName = 'Last name must be at least 2 characters';
  }
  
  if (!isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (!isStrongPassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters with uppercase, lowercase, and number';
  }
  
  if (!formData.agree) {
    errors.agree = 'You must agree to the terms and conditions';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};