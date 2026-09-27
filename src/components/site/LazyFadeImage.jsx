import React, { useState } from 'react';

/**
 * LazyFadeImage
 * Standalone image component that gracefully fades in on load.
 * Additive component — does not tamper with any existing <img> elements.
 */
export function LazyFadeImage({
  src,
  alt = '',
  className = '',
  loading = 'lazy',
  onLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad(e);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      onLoad={handleLoad}
      className={`transition-opacity duration-500 ease-out motion-reduce:transition-none ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      {...props}
    />
  );
}

export default LazyFadeImage;
