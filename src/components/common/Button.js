import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

/**
 * Reusable Button component
 * @param {Object} props - Component props

 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  fullWidth = false,
  icon = null,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  onClick,
  href,
  className = '',
  ...rest
}) => {
  // Generate button classes based on props
  const buttonClasses = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? 'btn-full-width' : '',
    icon ? 'btn-with-icon' : '',
    `icon-${iconPosition}`,
    disabled ? 'btn-disabled' : '',
    className
  ].filter(Boolean).join(' ');

  // Render icon based on position
  const renderIcon = () => {
    if (!icon) return null;
    return <span className="btn-icon">{icon}</span>;
  };

  // Render content with proper icon positioning
  const renderContent = () => (
    <>
      {iconPosition === 'left' && renderIcon()}
      <span className="btn-text">{children}</span>
      {iconPosition === 'right' && renderIcon()}
    </>
  );

  // Render as button or link based on href prop
  if (href) {
    return (
      <a 
        href={href} 
        className={buttonClasses} 
        onClick={onClick} 
        {...rest}
      >
        {renderContent()}
      </a>
    );
  }

  return (
    <button 
      type={type} 
      className={buttonClasses} 
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {renderContent()}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'text', 'success', 'warning', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  onClick: PropTypes.func,
  href: PropTypes.string,
  className: PropTypes.string
};

export default Button;
