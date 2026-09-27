import { useState, useEffect } from 'react';

/**
 * useActiveSection
 * Hook to track which page section is currently active in viewport using IntersectionObserver.
 * Non-intrusive and respects reduced-motion preferences.
 */
export function useActiveSection(sectionIds = ['home', 'about', 'services', 'mobile-apps', 'einvoicing', 'customers', 'contact']) {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: '-24% 0px -58% 0px',
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}

export default useActiveSection;
