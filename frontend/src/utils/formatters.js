// String and data formatting utilities

/**
 * Capitalize the first letter of a string
 * @param {string} str - Input string
 * @returns {string} Formatted string
 */
export const capitalizeFirst = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  /**
   * Format a name for display
   * @param {string} firstName - First name
   * @param {string} lastName - Last name
   * @param {Object} options - Formatting options
   * @returns {string} Formatted name
   */
  export const formatName = (firstName, lastName, options = {}) => {
    const defaultOptions = {
      includeLastName: true,
      lastNameFirst: false,
      abbreviated: false
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    if (!firstName && !lastName) return '';
    
    if (mergedOptions.abbreviated) {
      if (mergedOptions.includeLastName && firstName && lastName) {
        return `${firstName.charAt(0)}. ${lastName}`;
      }
      return firstName ? `${firstName.charAt(0)}.` : lastName;
    }
    
    if (mergedOptions.lastNameFirst) {
      if (mergedOptions.includeLastName && firstName && lastName) {
        return `${lastName}, ${firstName}`;
      }
    }
    
    if (mergedOptions.includeLastName) {
      return [firstName, lastName].filter(Boolean).join(' ');
    }
    
    return firstName || '';
  };
  
  /**
   * Format a currency amount
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code
   * @param {string} locale - Locale code
   * @returns {string} Formatted currency
   */
  export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  /**
   * Format a number with thousands separators
   * @param {number} number - Number to format
   * @param {number} decimals - Number of decimal places
   * @param {string} locale - Locale code
   * @returns {string} Formatted number
   */
  export const formatNumber = (number, decimals = 0, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(number);
  };
  
  /**
   * Format a percentage
   * @param {number} value - Value to format as percentage
   * @param {number} decimals - Number of decimal places
   * @param {string} locale - Locale code
   * @returns {string} Formatted percentage
   */
  export const formatPercentage = (value, decimals = 0, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value / 100);
  };
  
  /**
   * Format a file size
   * @param {number} bytes - Size in bytes
   * @param {number} decimals - Number of decimal places
   * @returns {string} Formatted file size
   */
  export const formatFileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };
  
  /**
   * Truncate a string with ellipsis
   * @param {string} str - Input string
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated string
   */
  export const truncateString = (str, maxLength = 50) => {
    if (!str || str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  };
  
  /**
   * Format a phone number
   * @param {string} phone - Phone number
   * @param {string} format - Format type
   * @returns {string} Formatted phone number
   */
  export const formatPhone = (phone, format = 'default') => {
    if (!phone) return '';
    
    // Remove all non-numeric characters
    const digits = phone.replace(/\D/g, '');
    
    switch (format) {
      case 'default':
        // Format as (XXX) XXX-XXXX for 10-digit numbers
        if (digits.length === 10) {
          return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
        return phone;
      
      case 'international':
        // Format as +X XXX XXX XXXX
        if (digits.length >= 10) {
          const countryCode = digits.length > 10 ? digits.slice(0, digits.length - 10) : '1';
          return `+${countryCode} ${digits.slice(-10, -7)} ${digits.slice(-7, -4)} ${digits.slice(-4)}`;
        }
        return phone;
      
      case 'dashed':
        // Format as XXX-XXX-XXXX
        if (digits.length === 10) {
          return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
        }
        return phone;
      
      default:
        return phone;
    }
  };
  
  /**
   * Format a skill level
   * @param {string|number} level - Skill proficiency level
   * @returns {string} Formatted skill level
   */
  export const formatSkillLevel = (level) => {
    // Handle numeric level (1-5)
    if (!isNaN(level)) {
      switch (parseInt(level)) {
        case 1: return 'Beginner';
        case 2: return 'Basic';
        case 3: return 'Intermediate';
        case 4: return 'Advanced';
        case 5: return 'Expert';
        default: return 'Unknown';
      }
    }
    
    // Handle text level
    if (typeof level === 'string') {
      const normalizedLevel = level.toLowerCase().trim();
      
      switch (normalizedLevel) {
        case 'beginner':
        case 'basic':
        case 'intermediate':
        case 'advanced':
        case 'expert':
          return capitalizeFirst(normalizedLevel);
        default:
          return 'Unknown';
      }
    }
    
    return 'Unknown';
  };
  
  /**
   * Generate a unique ID
   * @param {string} prefix - ID prefix
   * @returns {string} Unique ID
   */
  export const generateId = (prefix = '') => {
    return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).substr(2, 5)}`;
  };
  
  /**
   * Format session status for display
   * @param {string} status - Session status
   * @returns {Object} Formatted status with text and class
   */
  export const formatSessionStatus = (status) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return { text: 'Scheduled', class: 'status-scheduled' };
      case 'completed':
        return { text: 'Completed', class: 'status-completed' };
      case 'cancelled':
        return { text: 'Cancelled', class: 'status-cancelled' };
      case 'in-progress':
        return { text: 'In Progress', class: 'status-in-progress' };
      case 'pending':
        return { text: 'Pending Confirmation', class: 'status-pending' };
      default:
        return { text: capitalizeFirst(status) || 'Unknown', class: 'status-unknown' };
    }
  };