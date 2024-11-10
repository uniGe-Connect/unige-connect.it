import { useState, useCallback, useEffect } from 'react';

export const getScreenWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = useCallback(() => setWidth(window.innerWidth), []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return width;
};
