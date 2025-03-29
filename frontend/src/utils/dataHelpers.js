// Date formatting and manipulation utilities

/**
 * Format a date in a user-friendly way
 * @param {Date|string|number} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const defaultOptions = {
      includeTime: false,
      format: 'medium', // 'short', 'medium', 'long', 'full'
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    const dateOptions = {
      timeZone: mergedOptions.timeZone,
      dateStyle: mergedOptions.format
    };
    
    if (mergedOptions.includeTime) {
      dateOptions.timeStyle = mergedOptions.format === 'short' ? 'short' : 'medium';
    }
    
    try {
      return new Intl.DateTimeFormat('en-US', dateOptions).format(dateObj);
    } catch (error) {
      console.error("Date formatting error:", error);
      // Fallback formatting
      return dateObj.toLocaleString();
    }
  };
  
  /**
   * Format a time range
   * @param {Date|string|number} startTime - The start time
   * @param {Date|string|number} endTime - The end time
   * @param {Object} options - Formatting options
   * @returns {string} Formatted time range
   */
  export const formatTimeRange = (startTime, endTime, options = {}) => {
    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    
    const defaultOptions = {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      includeDate: true
    };
    
    const mergedOptions = { ...defaultOptions, ...options };
    
    // Check if dates are on the same day
    const sameDay = startDate.toDateString() === endDate.toDateString();
    
    // Format start time
    const startFormat = {
      timeZone: mergedOptions.timeZone,
      timeStyle: 'short'
    };
    
    if (mergedOptions.includeDate || !sameDay) {
      startFormat.dateStyle = 'medium';
    }
    
    // Format end time
    const endFormat = {
      timeZone: mergedOptions.timeZone,
      timeStyle: 'short'
    };
    
    if (!sameDay && mergedOptions.includeDate) {
      endFormat.dateStyle = 'medium';
    }
    
    const formattedStart = new Intl.DateTimeFormat('en-US', startFormat).format(startDate);
    const formattedEnd = new Intl.DateTimeFormat('en-US', endFormat).format(endDate);
    
    return `${formattedStart} - ${formattedEnd}`;
  };
  
  /**
   * Calculate session duration in minutes
   * @param {Date|string|number} startTime - The start time
   * @param {Date|string|number} endTime - The end time
   * @returns {number} Duration in minutes
   */
  export const calculateDuration = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const durationMs = end - start;
    return Math.round(durationMs / (1000 * 60));
  };
  
  /**
   * Format duration in a readable format
   * @param {number} minutes - Duration in minutes
   * @returns {string} Formatted duration string
   */
  export const formatDuration = (minutes) => {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ${remainingMinutes} min`;
  };
  
  /**
   * Get available time slots from availability data
   * @param {Array} teacherAvailability - Teacher's availability array
   * @param {Array} learnerAvailability - Learner's availability array
   * @returns {Array} Array of matching time slots
   */
  export const getMatchingTimeSlots = (teacherAvailability, learnerAvailability) => {
    const matchingSlots = [];
    
    teacherAvailability.forEach(teacherSlot => {
      const teacherStart = new Date(teacherSlot.startTime);
      const teacherEnd = new Date(teacherSlot.endTime);
      
      learnerAvailability.forEach(learnerSlot => {
        const learnerStart = new Date(learnerSlot.startTime);
        const learnerEnd = new Date(learnerSlot.endTime);
        
        // Find overlap
        const overlapStart = new Date(Math.max(teacherStart, learnerStart));
        const overlapEnd = new Date(Math.min(teacherEnd, learnerEnd));
        
        // If there's an overlap of at least 30 minutes
        if (overlapEnd - overlapStart >= 30 * 60 * 1000) {
          matchingSlots.push({
            startTime: overlapStart,
            endTime: overlapEnd,
            duration: Math.round((overlapEnd - overlapStart) / (60 * 1000))
          });
        }
      });
    });
    
    // Sort by start time
    return matchingSlots.sort((a, b) => a.startTime - b.startTime);
  };
  
  /**
   * Check if a date is in the past
   * @param {Date|string|number} date - The date to check
   * @returns {boolean} True if date is in the past
   */
  export const isPastDate = (date) => {
    return new Date(date) < new Date();
  };
  
  /**
   * Convert between time zones
   * @param {Date|string|number} date - The date to convert
   * @param {string} fromTimeZone - Source time zone
   * @param {string} toTimeZone - Target time zone
   * @returns {Date} Converted date
   */
  export const convertTimeZone = (date, fromTimeZone, toTimeZone) => {
    const dateObj = new Date(date);
    
    // Create formatter for source time zone
    const fromFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: fromTimeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    
    // Get date parts from source time zone
    const fromParts = fromFormatter.formatToParts(dateObj);
    const fromValues = {};
    
    fromParts.forEach(part => {
      if (part.type !== 'literal') {
        fromValues[part.type] = parseInt(part.value, 10);
      }
    });
    
    // Create date in target time zone
    const utcDate = new Date(Date.UTC(
      fromValues.year,
      fromValues.month - 1,
      fromValues.day,
      fromValues.hour,
      fromValues.minute,
      fromValues.second
    ));
    
    // Create formatter for target time zone
    const toFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: toTimeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });
    
    // Get date parts for target time zone
    const toParts = toFormatter.formatToParts(utcDate);
    const toValues = {};
    
    toParts.forEach(part => {
      if (part.type !== 'literal') {
        toValues[part.type] = parseInt(part.value, 10);
      }
    });
    
    // Create final date in target time zone
    return new Date(
      toValues.year,
      toValues.month - 1,
      toValues.day,
      toValues.hour,
      toValues.minute,
      toValues.second
    );
  };