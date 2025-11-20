import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 py-6 bg-black/40">
      <div className="w-full max-w-[1180px] mx-auto px-4 flex flex-wrap justify-between items-center gap-4 text-[11px] text-gray-500">
        <div>© 2025 دوس لتأجير السيارات.</div>
        <div className="hidden sm:block">نظام حجز متكامل (Demo Version)</div>
      </div>
    </footer>
  );
};