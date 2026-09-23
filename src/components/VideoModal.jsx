import React from 'react';
import { X } from 'lucide-react';

export default function VideoModal({ lang, videoModal, onClose }) {
  if (!videoModal?.isOpen) return null;

  return (
    <div className="video-lightbox fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 cursor-default" onClick={onClose}>
      <div className="video-stage relative flex items-center justify-center" onClick={(event) => event.stopPropagation()}>
        <button
          onClick={onClose}
          className="video-close absolute -right-16 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-amber-300/40 bg-slate-900/75 text-amber-300 shadow-lg backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
          title={lang === 'ar' ? 'إغلاق الفيديو' : 'Close Video'}
          aria-label={lang === 'ar' ? 'إغلاق الفيديو' : 'Close Video'}
        >
          <X className="h-5 w-5" />
        </button>
        <div className="video-dialog video-dialog-landscape relative w-[min(86vw,820px)] overflow-hidden rounded-[1.5rem] border border-slate-700/80 bg-black shadow-2xl">
          <div className="video-viewport relative aspect-video w-full bg-black">
            <iframe
              title={`${lang === 'ar' ? 'مشغل فيديو منتجات نايل تكنو' : 'Nile Techno video presentation display player'} - ${videoModal.title}`}
              src={videoModal.videoUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
