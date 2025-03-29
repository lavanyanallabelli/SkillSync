// Validation utilities for form inputs and data

/**
 * Email validator
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
    if (!email) return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  /**
   * Password strength validator
   * @param {string} password - Password to validate
   * @returns {Object} Validation result and strength score
   */
  export const validatePassword = (password) => {
    if (!password) {
      return {
        valid: false,
        score: 0,
        message: 'Password is required',
        requirements: []
      };
    }
  
    const requirements = [
      { 
        test: password.length >= 8,
        message: 'At least 8 characters'
      },
      {
        test: /[A-Z]/.test(password),
        message: 'At least one uppercase letter'
      },
      {
        test: /[a-z]/.test(password),
        message: 'At least one lowercase letter'
      },
      {
        test: /[0-9]/.test(password),
        message: 'At least one number'
      },
      {
        test: /[^A-Za-z0-9]/.test(password),
        message: 'At least one special character'
      }
    ];
    
    // Calculate score based on passed requirements
    const passedRequirements = requirements.filter(req => req.test);
    const score = passedRequirements.length;
    
    // Check minimum requirement (length >= 8 and at least 3 other criteria)
    const valid = password.length >= 8 && score >= 4;
    
    // Get failed requirements for feedback
    const failedRequirements = requirements
      .filter(req => !req.test)
      .map(req => req.message);
    
    return {
      valid,
      score,
      message: valid ? 'Password is strong' : 'Password does not meet requirements',
      requirements: failedRequirements
    };
  };
  
  /**
   * Username validator
   * @param {string} username - Username to validate
   * @returns {Object} Validation result
   */
  export const validateUsername = (username) => {
    if (!username) {
      return {
        valid: false,
        message: 'Username is required'
      };
    }
    
    if (username.length < 3) {
      return {
        valid: false,
        message: 'Username must be at least 3 characters'
      };
    }
    
    if (username.length > 20) {
      return {
        valid: false,
        message: 'Username must be less than 20 characters'
      };
    }
    
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return {
        valid: false,
        message: 'Username can only contain letters, numbers, underscores, and hyphens'
      };
    }
    
    return {
      valid: true,
      message: 'Username is valid'
    };
  };
  
  /**
   * Form field validator
   * @param {string} fieldName - Name of the field
   * @param {any} value - Value to validate
   * @param {Object} rules - Validation rules
   * @returns {Object} Validation result
   */
  export const validateField = (fieldName, value, rules = {}) => {
    if (rules.required && (!value || value.trim() === '')) {
      return {
        valid: false,
        message: `${fieldName} is required`
      };
    }
    
    if (rules.minLength && value.length < rules.minLength) {
      return {
        valid: false,
        message: `${fieldName} must be at least ${rules.minLength} characters`
      };
    }
    
    if (rules.maxLength && value.length > rules.maxLength) {
      return {
        valid: false,
        message: `${fieldName} must be less than ${rules.maxLength} characters`
      };
    }
    
    if (rules.pattern && !rules.pattern.test(value)) {
      return {
        valid: false,
        message: rules.patternMessage || `${fieldName} format is invalid`
      };
    }
    
    if (rules.custom && typeof rules.custom === 'function') {
      const customResult = rules.custom(value);
      if (!customResult.valid) {
        return customResult;
      }
    }
    
    return {
      valid: true,
      message: ''
    };
  };
  
  /**
   * Date validator
   * @param {Date|string|number} date - Date to validate
   * @param {Object} options - Validation options
   * @returns {boolean} True if valid
   */
  export const isValidDate = (date, options = {}) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      return false;
    }
    
    // Check if date is in the future (if required)
    if (options.requireFuture && dateObj <= new Date()) {
      return false;
    }
    
    // Check if date is in the past (if required)
    if (options.requirePast && dateObj >= new Date()) {
      return false;
    }
    
    // Check minimum date
    if (options.minDate && dateObj < new Date(options.minDate)) {
      return false;
    }
    
    // Check maximum date
    if (options.maxDate && dateObj > new Date(options.maxDate)) {
      return false;
    }
    
    return true;
  };
  
  /**
   * URL validator
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid
   */
  export const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };
  
  /**
   * Phone number validator
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if valid
   */
  export const isValidPhone = (phone) => {
    // Basic international phone validation
    // Allows formats like +1234567890, (123) 456-7890, etc.
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return phoneRegex.test(phone);
  };
  
  /**
   * Rating validator
   * @param {number} rating - Rating to validate
   * @param {number} min - Minimum allowed rating
   * @param {number} max - Maximum allowed rating
   * @returns {boolean} True if valid
   */
  export const isValidRating = (rating, min = 1, max = 5) => {
    const numRating = Number(rating);
    return !isNaN(numRating) && numRating >= min && numRating <= max;
  };