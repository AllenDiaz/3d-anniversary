import { useMemo } from 'react';
import { allMemories, dateMilestones, roomThemes } from '@/data/memories';
import { stories } from '@/data/stories';
import { Memory, DateMilestone, Story, RoomTheme, TimelineEntry } from '@/types/memory';

/**
 * Custom hook for accessing and filtering memory data
 * Provides memoized data access and utility functions
 */
export function useMemories() {
  // Get memories filtered by room
  const getMemoriesByRoom = (room: 'main' | 'firstDate' | 'adventures' | 'specialMoments'): Memory[] => {
    return allMemories.filter(memory => memory.room === room);
  };

  // Get a specific memory by ID
  const getMemoryById = (id: string): Memory | undefined => {
    return allMemories.find(memory => memory.id === id);
  };

  // Get story associated with a memory
  const getStoryByMemoryId = (memoryId: string): Story | undefined => {
    return stories.find(story => story.memoryId === memoryId);
  };

  // Get all stories for memories in a specific room
  const getStoriesByRoom = (room: 'main' | 'firstDate' | 'adventures' | 'specialMoments'): Story[] => {
    const roomMemoryIds = allMemories
      .filter(memory => memory.room === room)
      .map(memory => memory.id);
    return stories.filter(story => roomMemoryIds.includes(story.memoryId));
  };

  // Get milestones within a date range
  const getMilestonesByDateRange = (startDate: string, endDate: string): DateMilestone[] => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return dateMilestones.filter(milestone => {
      const date = new Date(milestone.date);
      return date >= start && date <= end;
    });
  };

  // Get milestones by category
  const getMilestonesByCategory = (category: DateMilestone['category']): DateMilestone[] => {
    return dateMilestones.filter(milestone => milestone.category === category);
  };

  // Get room theme by ID
  const getRoomThemeById = (id: string): RoomTheme | undefined => {
    return roomThemes.find(theme => theme.id === id);
  };

  // Search memories by tags
  const searchMemoriesByTag = (tag: string): Memory[] => {
    return allMemories.filter(memory => 
      memory.tags?.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  };

  // Search memories by text (title, description, location)
  const searchMemories = (query: string): Memory[] => {
    const lowerQuery = query.toLowerCase();
    return allMemories.filter(memory =>
      memory.title.toLowerCase().includes(lowerQuery) ||
      memory.description.toLowerCase().includes(lowerQuery) ||
      memory.location?.toLowerCase().includes(lowerQuery) ||
      memory.emotion?.toLowerCase().includes(lowerQuery)
    );
  };

  // Get memories sorted chronologically
  const sortedMemories = useMemo(() => {
    return [...allMemories].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, []);

  // Get most recent memories
  const recentMemories = useMemo(() => {
    return [...allMemories]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, []);

  // Get oldest (earliest) memories
  const earliestMemories = useMemo(() => {
    return [...allMemories]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  }, []);

  // Create timeline entries (grouped by month)
  const timeline = useMemo((): TimelineEntry[] => {
    const timelineMap = new Map<string, TimelineEntry>();

    // Group memories by month
    allMemories.forEach(memory => {
      const date = new Date(memory.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!timelineMap.has(monthKey)) {
        timelineMap.set(monthKey, {
          date: monthKey,
          memories: [],
          milestones: [],
        });
      }
      
      timelineMap.get(monthKey)!.memories.push(memory);
    });

    // Add milestones to timeline
    dateMilestones.forEach(milestone => {
      const date = new Date(milestone.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!timelineMap.has(monthKey)) {
        timelineMap.set(monthKey, {
          date: monthKey,
          memories: [],
          milestones: [],
        });
      }
      
      timelineMap.get(monthKey)!.milestones.push(milestone);
    });

    // Convert to array and sort chronologically
    return Array.from(timelineMap.values())
      .sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  // Get statistics
  const statistics = useMemo(() => {
    const totalDays = Math.floor(
      (new Date().getTime() - new Date(sortedMemories[0]?.date || new Date()).getTime()) 
      / (1000 * 60 * 60 * 24)
    );

    const roomCounts = {
      main: getMemoriesByRoom('main').length,
      firstDate: getMemoriesByRoom('firstDate').length,
      adventures: getMemoriesByRoom('adventures').length,
      specialMoments: getMemoriesByRoom('specialMoments').length,
    };

    return {
      totalMemories: allMemories.length,
      totalMilestones: dateMilestones.length,
      totalStories: stories.length,
      totalDays,
      roomCounts,
      firstDate: sortedMemories[0]?.date,
      latestMemory: recentMemories[0]?.date,
    };
  }, [sortedMemories, recentMemories]);

  return {
    // Raw data
    allMemories,
    dateMilestones,
    roomThemes,
    stories,

    // Filtered/sorted data
    sortedMemories,
    recentMemories,
    earliestMemories,
    timeline,
    statistics,

    // Utility functions
    getMemoriesByRoom,
    getMemoryById,
    getStoryByMemoryId,
    getStoriesByRoom,
    getMilestonesByDateRange,
    getMilestonesByCategory,
    getRoomThemeById,
    searchMemoriesByTag,
    searchMemories,
  };
}
