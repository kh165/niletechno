import React, { useEffect, useState } from 'react';

function DeferredSection({ children, minHeight = 320, preload }) {
  const [shouldRender, setShouldRender] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    if (shouldRender || !sectionRef.current) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        preload?.();
        setShouldRender(true);
        observer.disconnect();
      }
    }, { threshold: 0.01, rootMargin: '1000px 0px' });
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [shouldRender]);

  return (
    <div ref={sectionRef} style={{ minHeight }}>
      {shouldRender ? children : <div className="section-deferred-placeholder" aria-hidden="true" />}
    </div>
  );
}

// Lightweight page-wide scroll choreography. It never hijacks wheel/touch input;
// all work is limited to IntersectionObserver plus one rAF scroll loop for parallax.
function ScrollExperience() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const sections = Array.from(document.querySelectorAll('section'));
    const revealTargets = sections.filter((section) => section.id !== 'home');
    const staggerTargets = [];
    const parallaxTargets = [];

    revealTargets.forEach((section) => {
      section.classList.add('scroll-reveal');
      const groups = section.querySelectorAll(':scope > div > div');
      groups.forEach((group, index) => {
        if (index < 8) {
          group.classList.add('scroll-stagger-item');
          group.style.setProperty('--stagger-index', String(index));
          staggerTargets.push(group);
        }
      });

      section.querySelectorAll(':scope > .absolute[class*="blur"]').forEach((element) => {
        element.classList.add('scroll-parallax');
        parallaxTargets.push(element);
      });
    });

    if (reduceMotion) {
      revealTargets.forEach((section) => section.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        target.classList.toggle('is-visible', isIntersecting);
      });
    }, { threshold: 0.01, rootMargin: '0px 0px 14% 0px' });

    revealTargets.forEach((section) => observer.observe(section));

    let frameId = 0;
    const updateScrollState = () => {
      frameId = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty('--scroll-progress', String(window.scrollY / maxScroll));

      parallaxTargets.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
        const offset = Math.max(-18, Math.min(18, (window.innerHeight / 2 - (rect.top + rect.height / 2)) * 0.035));
        element.style.setProperty('--parallax-y', `${offset.toFixed(2)}px`);
      });
    };
    const onScroll = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateScrollState);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateScrollState();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      if (frameId) window.cancelAnimationFrame(frameId);
      revealTargets.forEach((section) => section.classList.remove('scroll-reveal', 'is-visible'));
      staggerTargets.forEach((element) => {
        element.classList.remove('scroll-stagger-item');
        element.style.removeProperty('--stagger-index');
      });
      parallaxTargets.forEach((element) => {
        element.classList.remove('scroll-parallax');
        element.style.removeProperty('--parallax-y');
      });
      document.documentElement.style.removeProperty('--scroll-progress');
    };
  }, []);

  return null;
}

export { DeferredSection, ScrollExperience };
