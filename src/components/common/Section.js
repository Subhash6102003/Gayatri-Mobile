import React from 'react';
import PropTypes from 'prop-types';
import { useScrollAnimation } from '../hooks/useAnimation';
import './Section.css';

/**
 * Reusable Section component with animation support
 * @param {Object} props - Component props

 */
const Section = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  contentClassName = '',
  background = 'light',
  containerWidth = 'default',
  animationOptions = {},
  titleAnimationOptions = {},
  noPadding = false,
}) => {
  // Animation ref for the section content
  const sectionRef = useScrollAnimation(animationOptions);
  
  // Animation ref for the section title with different timing
  const titleRef = useScrollAnimation({
    y: 30,
    duration: 0.8,
    ...titleAnimationOptions
  });
  
  // Generate section classes based on props
  const sectionClasses = [
    'section',
    `bg-${background}`,
    noPadding ? 'no-padding' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Generate container classes based on props
  const containerClasses = [
    'container',
    containerWidth !== 'default' ? `container-${containerWidth}` : ''
  ].filter(Boolean).join(' ');

  return (
    <section id={id} className={sectionClasses}>
      <div className={containerClasses}>
        {(title || subtitle) && (
          <div className="section-header" ref={titleRef}>
            {title && (
              <h2 className={`section-title ${titleClassName}`}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className={`section-subtitle ${subtitleClassName}`}>
                {subtitle}
              </p>
            )}
          </div>
        )}
        <div className={`section-content ${contentClassName}`} ref={sectionRef}>
          {children}
        </div>
      </div>
    </section>
  );
};

Section.propTypes = {
  id: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  titleClassName: PropTypes.string,
  subtitleClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  background: PropTypes.oneOf(['light', 'dark', 'accent', 'primary', 'secondary']),
  containerWidth: PropTypes.oneOf(['default', 'narrow', 'wide', 'full']),
  animationOptions: PropTypes.object,
  titleAnimationOptions: PropTypes.object,
  noPadding: PropTypes.bool
};

export default Section;
