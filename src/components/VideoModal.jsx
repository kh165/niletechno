import React from 'react';
import { X } from 'lucide-react';
import Modal from './common/Modal';

export default function VideoModal({ lang, videoModal, onClose }) {
  const isRtl = lang === 'ar';

  return (
    <Modal
      isOpen={Boolean(videoModal?.isOpen)}
      onClose={onClose}
      title={videoModal?.title || (isRtl ? 'عرض فيديو تعريفي' : 'Video Presentation')}
      maxWidth="max-w-4xl"
    >
      <div className="relative flex flex-col items-center">
        {/* Floating close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 ltr:right-0 rtl:left-0 sm:ltr:-right-4 sm:rtl:-left-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-slate-900/90 text-white shadow-lg backdrop-blur-md transition-all hover:bg-slate-800 hover:scale-105 active:scale-95 cursor-pointer"
          title={isRtl ? 'إغلاق الفيديو' : 'Close Video'}
          aria-label={isRtl ? 'إغلاق الفيديو' : 'Close Video'}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-black shadow-2xl">
          <div className="relative aspect-video w-full bg-black">
            {videoModal?.isOpen && (
              <iframe
                title={`${isRtl ? 'مشغل فيديو' : 'Video player'} - ${videoModal.title || ''}`}
                src={videoModal.videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            )}
          </div>
        </div>

        {videoModal?.title && (
          <div className="mt-3 text-center text-sm font-bold text-slate-200 font-cairo">
            {videoModal.title}
          </div>
        )}
      </div>
    </Modal>
  );
}
