import React, { forwardRef } from 'react';

const Button = forwardRef(({ onClick, children, className = '', disabled = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
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
