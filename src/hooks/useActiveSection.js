import { useCallback, useEffect, useRef, useState } from 'react';

// Must stay larger than the CSS scroll-padding-top (5rem = 80px) so a section
// that was just scrolled to counts as "reached".
const ACTIVE_LINE_OFFSET = 96;
const SETTLE_DELAY_MS = 150;

function findActiveSection(ids) {
  const sections = ids
    .map((id) => ({ id, el: document.getElementById(id) }))
    .filter(({ el }) => el)
    .map(({ id, el }) => ({ id, top: el.getBoundingClientRect().top }));

  if (sections.length === 0) return ids[0];

  const atPageBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
  const candidates = atPageBottom
    ? sections
    : sections.filter(({ top }) => top <= ACTIVE_LINE_OFFSET);

  const pool = candidates.length > 0 ? candidates : [sections.reduce((a, b) => (b.top < a.top ? b : a))];
  return pool.reduce((a, b) => (b.top > a.top ? b : a)).id;
}

/**
 * Tracks the section under the navbar line and lets the navbar jump to a section
 * with the highlight locked on the clicked item until scrolling settles.
 * @param {string[]} sectionIds ids of the nav sections (any order)
 * @returns {{ activeSection: string, scrollToSection: (id: string) => void }}
 */
export function useActiveSection(sectionIds) {
  const idsKey = sectionIds.join('|');
  const [activeSection, setActiveSection] = useState(sectionIds[0]);
  const lockedRef = useRef(false);
  const timerRef = useRef(0);

  const settle = useCallback(() => {
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      lockedRef.current = false;
      setActiveSection(findActiveSection(idsKey.split('|')));
    }, SETTLE_DELAY_MS);
  }, [idsKey]);

  useEffect(() => {
    const ids = idsKey.split('|');
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!lockedRef.current) setActiveSection(findActiveSection(ids));
    };
    const onChange = () => {
      if (lockedRef.current) {
        settle();
      } else if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener('scroll', onChange, { passive: true });
    window.addEventListener('resize', onChange, { passive: true });
    // Section heights change (guide open/close, lazy images) without any scroll event.
    const resizeObserver = new ResizeObserver(onChange);
    resizeObserver.observe(document.body);

    return () => {
      window.removeEventListener('scroll', onChange);
      window.removeEventListener('resize', onChange);
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timerRef.current);
    };
  }, [idsKey, settle]);

  const scrollToSection = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      lockedRef.current = true;
      setActiveSection(id);
      el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      settle();
    },
    [settle]
  );

  return { activeSection, scrollToSection };
}

export default useActiveSection;