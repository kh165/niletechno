import { useState, useEffect } from 'react';
import { REAL_SALES_APP_SCREENS } from '../data/mobileScreens';

/**
 * Custom hook to manage mobile app screens navigation,
 * auto-rotation when idle, and lightbox preview.
 */
export function useAppScreens(isSalesRepActive = true) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);

  const screensCount = REAL_SALES_APP_SCREENS.length;
  const currentRealScreen = REAL_SALES_APP_SCREENS[activeScreenIndex] || REAL_SALES_APP_SCREENS[0];

  // Auto-rotate screens for smooth live preview when not hovered
  useEffect(() => {
    if (!isSalesRepActive || isHovered || isFullscreenModalOpen) return;
    const interval = setInterval(() => {
      setActiveScreenIndex((prev) => (prev + 1) % screensCount);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSalesRepActive, isHovered, isFullscreenModalOpen, screensCount]);

  const nextScreen = (e) => {
    if (e) e.stopPropagation();
    setActiveScreenIndex((prev) => (prev + 1) % screensCount);
  };

  const prevScreen = (e) => {
    if (e) e.stopPropagation();
    setActiveScreenIndex((prev) => (prev - 1 + screensCount) % screensCount);
  };

  return {
    activeScreenIndex,
    setActiveScreenIndex,
    currentRealScreen,
    isHovered,
    setIsHovered,
    isFullscreenModalOpen,
    setIsFullscreenModalOpen,
    nextScreen,
    prevScreen,
    screens: REAL_SALES_APP_SCREENS
  };
}

export default useAppScreens;
