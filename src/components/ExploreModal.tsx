import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Utensils,
  Award,
  CheckCircle2,
  Calendar,
  Clock,
  Coins,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { GALLERY_ITEMS, BUFFET_VS_THALI_DATA, THALI_IMAGE } from '../data/menuData';
import { GalleryItem } from '../types/restaurant';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'gallery' | 'buffet_vs_thali';
  onOpenReservations: () => void;
  onOpenMenu: () => void;
}

export const ExploreModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialTab = 'gallery',
  onOpenReservations,
  onOpenMenu
}) => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'buffet_vs_thali'>(initialTab);
  const [subView, setSubView] = useState<'both' | 'thali' | 'buffet'>('both');
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Sync initial tab when changed from props
  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  if (!isOpen) return null;

  const filteredGallery =
    selectedGalleryCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedGalleryCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-stone-900 border border-stone-800 rounded-2xl shadow-2xl overflow-hidden text-stone-100 my-auto flex flex-col max-h-[92vh]">
        {/* Top Header - Compact, Space-Optimized */}
        <div className="flex items-center justify-between px-3.5 sm:px-5 py-2.5 sm:py-3 bg-stone-950 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 block leading-tight truncate">
                Maheswari Heritage
              </span>
              <h2 className="text-sm sm:text-base font-serif-display font-bold text-amber-100 leading-tight truncate">
                {activeTab === 'gallery' ? 'Visual Gallery' : 'Buffet vs. Thali Experience'}
              </h2>
            </div>
          </div>

          {/* Navigation Tab Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center p-0.5 sm:p-1 bg-stone-800/90 rounded-xl border border-stone-700/80">
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'gallery'
                    ? 'bg-amber-400 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Gallery
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('buffet_vs_thali')}
                className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'buffet_vs_thali'
                    ? 'bg-amber-400 text-stone-950 shadow-sm font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                Buffet vs. Thali
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 sm:p-2 text-stone-400 hover:text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content with Compact Spacing */}
        <div className="overflow-y-auto flex-1 p-3.5 sm:p-5 space-y-4">
          {/* ================= TAB 1: GALLERY ================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-4">
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Photos' },
                  { id: 'dishes', label: 'Signature Dishes' },
                  { id: 'ambiance', label: 'Dining Ambiance' },
                  { id: 'tandoor', label: 'Clay Tandoors' },
                  { id: 'bar', label: 'Botanical Bar' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedGalleryCategory(cat.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedGalleryCategory === cat.id
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
                        : 'bg-stone-800/60 text-stone-300 border border-stone-700/60 hover:border-stone-600'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredGallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedImage(item)}
                    className="group relative rounded-xl overflow-hidden bg-stone-950 border border-stone-800 aspect-[4/3] cursor-pointer"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                          {item.category}
                        </span>
                        <Maximize2 className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-400 transition-colors" />
                      </div>
                      <h4 className="text-xs font-bold text-stone-100 line-clamp-1 mt-0.5">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= TAB 2: BUFFET VS THALI ================= */}
          {activeTab === 'buffet_vs_thali' && (
            <div className="space-y-3.5">
              {/* Interactive Sub-Nav Selector (Universal Fix for Buffet vs Thali Selection) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 bg-stone-950/70 border border-stone-800 rounded-xl">
                <div className="flex items-center gap-1.5 p-0.5 bg-stone-900 rounded-lg border border-stone-800 w-full sm:w-auto overflow-x-auto">
                  <button
                    type="button"
                    onClick={() => setSubView('both')}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                      subView === 'both'
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                    }`}
                  >
                    <span>⚖️</span>
                    <span>Compare Both</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubView('thali')}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                      subView === 'thali'
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                    }`}
                  >
                    <span>👑</span>
                    <span>Royal Thali (₹425)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubView('buffet')}
                    className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                      subView === 'buffet'
                        ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                        : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                    }`}
                  >
                    <span>🥘</span>
                    <span>Weekend Buffet (₹799)</span>
                  </button>
                </div>

                <div className="text-[11px] text-stone-400 hidden md:flex items-center gap-1.5 px-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>100% Pure Vegetarian Heritage Feasts</span>
                </div>
              </div>

              {/* Side-by-Side Comparison Cards or Selected Single View */}
              <div
                className={`grid gap-3.5 ${
                  subView === 'both' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                }`}
              >
                {/* 1. The Maheswari Royal Thali */}
                {(subView === 'both' || subView === 'thali') && (
                  <div className="bg-stone-800/70 rounded-xl border border-amber-500/30 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all shadow-md">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider border border-amber-400/30">
                          {BUFFET_VS_THALI_DATA.thali.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-300">
                          {BUFFET_VS_THALI_DATA.thali.pricing}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-serif-display font-bold text-white">
                          {BUFFET_VS_THALI_DATA.thali.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-1">
                          <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{BUFFET_VS_THALI_DATA.thali.timing}</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed italic border-l-2 border-amber-500/60 pl-2.5 py-0.5">
                        "{BUFFET_VS_THALI_DATA.thali.philosophy}"
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                          Experience Highlights:
                        </span>
                        <ul className="space-y-1 text-xs text-stone-300">
                          {BUFFET_VS_THALI_DATA.thali.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-300 block">
                          Included in the Bronze Thali:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {BUFFET_VS_THALI_DATA.thali.itemsIncluded.map((item, i) => (
                            <span
                              key={i}
                              className="text-[10.5px] px-2 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-stone-700/60">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenMenu();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs hover:bg-amber-300 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                      >
                        <Utensils className="w-3.5 h-3.5" />
                        <span>View & Order Royal Thalis</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Grand Weekend Royal Buffet */}
                {(subView === 'both' || subView === 'buffet') && (
                  <div className="bg-stone-800/70 rounded-xl border border-stone-700 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden transition-all shadow-md">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                          {BUFFET_VS_THALI_DATA.buffet.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-300">
                          {BUFFET_VS_THALI_DATA.buffet.pricing}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-base sm:text-lg font-serif-display font-bold text-white">
                          {BUFFET_VS_THALI_DATA.buffet.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-1">
                          <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{BUFFET_VS_THALI_DATA.buffet.timing}</span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-300 leading-relaxed italic border-l-2 border-emerald-500/60 pl-2.5 py-0.5">
                        "{BUFFET_VS_THALI_DATA.buffet.philosophy}"
                      </p>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                          Live Counters & Offerings:
                        </span>
                        <ul className="space-y-1 text-xs text-stone-300">
                          {BUFFET_VS_THALI_DATA.buffet.features.map((feat, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-300 block">
                          Included in the Grand Spread:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {BUFFET_VS_THALI_DATA.buffet.itemsIncluded.map((item, i) => (
                            <span
                              key={i}
                              className="text-[10.5px] px-2 py-0.5 rounded-md bg-stone-900 border border-stone-700 text-stone-200"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-3 border-t border-stone-700/60">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenReservations();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-stone-700 hover:bg-stone-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                      >
                        <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Reserve Table for Weekend Buffet</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lightbox Modal when image clicked */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-60 bg-stone-950/95 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-stone-900/80 rounded-full text-white hover:bg-stone-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-5 bg-stone-900 text-stone-100">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                  {selectedImage.category}
                </span>
                <h3 className="text-lg font-serif-display font-bold text-white">
                  {selectedImage.title}
                </h3>
                <p className="text-xs text-stone-300 mt-1 leading-relaxed">
                  {selectedImage.caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
