'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Memory, DateMilestone } from '@/types/memory';

interface TimelineProps {
  isOpen: boolean;
  onClose: () => void;
  timeline: {
    date: string;
    memories: Memory[];
    milestones: DateMilestone[];
  }[];
  onMemoryClick: (memory: Memory) => void;
}

export default function Timeline({ isOpen, onClose, timeline, onMemoryClick }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const entriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen && entriesRef.current.length > 0) {
      // Animate timeline entries on open
      gsap.fromTo(
        entriesRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: 'power2.out',
        }
      );
    }
  }, [isOpen]);

  const formatMonthYear = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const getMilestoneIcon = (category: DateMilestone['category']) => {
    const icons: Record<string, string> = {
      anniversary: '🎉',
      first: '✨',
      achievement: '🏆',
      milestone: '📍',
      special: '💫',
      adventure: '🗺️',
    };
    return icons[category] || '📌';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Timeline Panel */}
      <div 
        ref={timelineRef}
        className="relative w-full max-w-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 shadow-2xl overflow-hidden transition-all duration-500 ease-out"
        style={{ animation: 'slideInLeft 0.5s ease-out' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-amber-900 to-amber-950 px-6 py-4 shadow-lg border-b border-amber-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <h2 className="text-2xl font-bold text-amber-400">Our Timeline</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-amber-400 transition-colors text-3xl font-light"
              aria-label="Close timeline"
            >
              ×
            </button>
          </div>
          <p className="text-amber-300/70 text-sm mt-2">
            Journey through our memories chronologically
          </p>
        </div>

        {/* Timeline Content */}
        <div className="overflow-y-auto h-[calc(100vh-120px)] px-6 py-6 custom-scrollbar">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-pink-500 to-purple-500" />

            {/* Timeline Entries */}
            <div className="space-y-8">
              {timeline.map((entry, index) => (
                <div
                  key={entry.date}
                  ref={(el) => { entriesRef.current[index] = el; }}
                  className="relative pl-16"
                >
                  {/* Month/Year Badge */}
                  <div className="absolute left-0 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg border-4 border-zinc-900 z-10">
                    <span className="text-white text-xs font-bold">
                      {entry.date.split('-')[1]}
                    </span>
                  </div>

                  {/* Month/Year Label */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-amber-400">
                      {formatMonthYear(entry.date)}
                    </h3>
                  </div>

                  {/* Milestones */}
                  {entry.milestones.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {entry.milestones.map((milestone) => (
                        <div
                          key={milestone.id}
                          className="bg-gradient-to-r from-purple-900/50 to-purple-800/30 p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/60 transition-all hover:shadow-lg hover:shadow-purple-500/20"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0">
                              {getMilestoneIcon(milestone.category)}
                            </span>
                            <div className="flex-1">
                              <h4 className="text-purple-300 font-semibold">
                                {milestone.title}
                              </h4>
                              <p className="text-purple-200/70 text-sm mt-1">
                                {milestone.description}
                              </p>
                              <div className="flex items-center gap-3 mt-2 text-xs text-purple-300/50">
                                <span>📅 {milestone.date}</span>
                                <span className="px-2 py-0.5 bg-purple-500/20 rounded">
                                  {milestone.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Memories */}
                  {entry.memories.length > 0 && (
                    <div className="space-y-3">
                      {entry.memories.map((memory) => (
                        <button
                          key={memory.id}
                          onClick={() => onMemoryClick(memory)}
                          className="w-full text-left bg-gradient-to-r from-zinc-800 to-zinc-900 p-4 rounded-lg border border-zinc-700 hover:border-pink-500/50 transition-all hover:shadow-lg hover:shadow-pink-500/20 hover:scale-[1.02] group"
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                              💕
                            </span>
                            <div className="flex-1">
                              <h4 className="text-pink-300 font-semibold group-hover:text-pink-400 transition-colors">
                                {memory.title}
                              </h4>
                              <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                                {memory.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                                <span>📅 {memory.date}</span>
                                {memory.location && (
                                  <span>📍 {memory.location}</span>
                                )}
                                {memory.emotion && (
                                  <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 rounded">
                                    {memory.emotion}
                                  </span>
                                )}
                              </div>
                              {memory.tags && memory.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {memory.tags.slice(0, 3).map((tag) => (
                                    <span
                                      key={tag}
                                      className="text-xs px-2 py-0.5 bg-zinc-700 text-zinc-400 rounded"
                                    >
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Timeline Footer */}
            <div className="mt-8 text-center pb-4">
              <div className="inline-block bg-gradient-to-r from-amber-900 to-pink-900 px-6 py-3 rounded-full">
                <p className="text-amber-200 font-semibold">
                  ✨ {timeline.reduce((sum, entry) => sum + entry.memories.length, 0)} Memories
                  &nbsp;•&nbsp;
                  {timeline.reduce((sum, entry) => sum + entry.milestones.length, 0)} Milestones
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-900 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
