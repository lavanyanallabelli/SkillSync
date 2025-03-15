// src/components/common/Rating.jsx
import React from 'react';

const Rating = ({ value, total = 5, size = 'medium', onChange, readOnly = false }) => {
  const sizeClasses = {
    small: 'w-3 h-3',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };
  
  const renderStars = () => {
    const stars = [];
    
    for (let i = 1; i <= total; i++) {
      const starFill = i <= value ? 'text-yellow-400' : 'text-gray-300';
      
      stars.push(
        <button
          key={i}
          type="button"
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} focus:outline-none`}
          onClick={() => !readOnly && onChange && onChange(i)}
          disabled={readOnly}
        >
          <svg
            className={`${sizeClasses[size]} ${starFill}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      );
    }
    
    return stars;
  };
  
  return <div className="flex">{renderStars()}</div>;
};

export default Rating;