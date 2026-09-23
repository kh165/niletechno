import React from 'react';

// Safe DeferredSection wrapper that renders content immediately without hiding it
function DeferredSection({ children }) {
  return <>{children}</>;
}

// ScrollExperience component: Kept safe and clean without tampering with DOM nodes or hiding sections
function ScrollExperience() {
  return null;
}

export { DeferredSection, ScrollExperience };
