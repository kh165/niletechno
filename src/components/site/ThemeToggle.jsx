import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle({ theme, setTheme, lang = 'ar', className = '' }) {
  // Ensure local storage and DOM class are synchronized
  const toggleTheme = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('nt_theme', nextTheme);
    } catch (err) {
      console.warn('Could not persist theme to localStorage', err);
    }
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      document.body.style.backgroundColor = '#0a0f1d';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.style.backgroundColor = '#ffffff';
    }
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('nt_theme');
      if (saved && (saved === 'light' || saved === 'dark') && saved !== theme) {
        setTheme(saved);
      }
    } catch (err) {
      console.warn('Could not read theme from localStorage', err);
    }
  }, []);

  const isDark = theme === 'dark';
  const label = isDark 
    ? (lang === 'ar' ? 'التبديل إلى الوضع الفاتح' : 'Switch to light mode')
    : (lang === 'ar' ? 'التبديل إلى الوضع الداكن' : 'Switch to dark mode');

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={label}
      aria-label={label}
      className={`relative inline-flex items-center justify-center min-w-[38px] min-h-[38px] w-9 h-9 rounded-xl transition-all duration-300 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 active:scale-95 ${
        isDark
          ? 'bg-slate-900/90 text-amber-300 border border-slate-700/80 hover:border-amber-400/50 hover:bg-slate-800 shadow-sm'
          : 'bg-slate-100 text-slate-700 border border-slate-300/80 hover:border-slate-400 hover:bg-slate-200/80 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-300" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0 text-slate-700" />
        )}
      </div>
    </button>
  );
}
