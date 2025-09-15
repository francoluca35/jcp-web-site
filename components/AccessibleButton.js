import { Button } from './ui/button';

const AccessibleButton = ({ 
  children, 
  onClick, 
  ariaLabel, 
  ariaDescribedBy,
  disabled = false,
  variant = "default",
  size = "default",
  className = "",
  ...props 
}) => {
  return (
    <Button
      onClick={onClick}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      disabled={disabled}
      variant={variant}
      size={size}
      className={`focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AccessibleButton;
