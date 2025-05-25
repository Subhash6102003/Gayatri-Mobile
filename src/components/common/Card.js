import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

/**
 * Reusable Card component 
 * @param {Object} props - Component props
 
 */
const Card = ({
  title,
  subtitle,
  content,
  image,
  imageAlt = '',
  icon,
  footer,
  onClick,
  href,
  variant = 'default',
  elevation = 'medium',
  className = '',
  children,
  ...rest
}) => {
  // Generate card classes based on props
  const cardClasses = [
    'card',
    `card-${variant}`,
    `elevation-${elevation}`,
    onClick || href ? 'card-interactive' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Content for the card
  const cardContent = (
    <>
      {/* Card Image */}
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt} />
        </div>
      )}
      
      {/* Card Body */}
      <div className="card-body">
        {/* Card Icon */}
        {icon && <div className="card-icon">{icon}</div>}
        
        {/* Card Title */}
        {title && <h3 className="card-title">{title}</h3>}
        
        {/* Card Subtitle */}
        {subtitle && <h4 className="card-subtitle">{subtitle}</h4>}
        
        {/* Card Content */}
        {content && <div className="card-text">{content}</div>}
        
        {/* Children */}
        {children}
      </div>
      
      {/* Card Footer */}
      {footer && <div className="card-footer">{footer}</div>}
    </>
  );

  // Wrap with anchor tag if href is provided
  if (href) {
    return (
      <a href={href} className={cardClasses} {...rest}>
        {cardContent}
      </a>
    );
  }
  
  // Render as interactive div if onClick is provided
  return (
    <div 
      className={cardClasses} 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...rest}
    >
      {cardContent}
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  content: PropTypes.node,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  icon: PropTypes.node,
  footer: PropTypes.node,
  onClick: PropTypes.func,
  href: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'outlined', 'feature', 'pricing', 'testimonial']),
  elevation: PropTypes.oneOf(['none', 'low', 'medium', 'high']),
  className: PropTypes.string,
  children: PropTypes.node
};

export default Card;
