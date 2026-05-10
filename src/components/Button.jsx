import React, { forwardRef } from 'react';
import { playClick } from '../utils/sounds';

const Button = forwardRef(({ onClick, children, className = '', disabled = false, ...props }, ref) => {
  const handleClick = (e) => {
    playClick();
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
      disabled={disabled}
      className={`font-buttons px-4 py-2 rounded-full transition-all duration-300 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
