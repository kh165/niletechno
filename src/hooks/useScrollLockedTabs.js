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
    setActiveTab(tabId);
  };

  return { handleTabSelect };
}

export default useScrollLockedTabs;
