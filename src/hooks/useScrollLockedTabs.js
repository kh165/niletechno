/**
 * Custom hook to lock window scroll position across synchronous ticks,
 * animation frames, and microtasks when switching tabs.
 */
export function useScrollLockedTabs(setActiveTab) {
  const handleTabSelect = (e, tabId) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.currentTarget && typeof e.currentTarget.blur === 'function') {
        e.currentTarget.blur();
      }
    }
    
    const savedY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    setActiveTab(tabId);
    
    // Lock position across synchronous tick, animation frame, and timeout
    window.scrollTo({ top: savedY, behavior: 'instant' });
    requestAnimationFrame(() => {
      window.scrollTo({ top: savedY, behavior: 'instant' });
      setTimeout(() => {
        window.scrollTo({ top: savedY, behavior: 'instant' });
      }, 15);
    });
  };

  return { handleTabSelect };
}

export default useScrollLockedTabs;
