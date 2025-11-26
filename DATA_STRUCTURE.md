# 📸 Memory Data Structure Documentation

## Overview
Complete type-safe data structure for managing photos, memories, stories, and milestones in the Virtual Love Museum.

## 📁 File Structure

```
types/
  └── memory.ts          # TypeScript interfaces and types

data/
  ├── memories.ts        # Memory and milestone data
  └── stories.ts         # Long-form stories

hooks/
  └── useMemories.ts     # Data access hook
```

---

## 🎯 Type Definitions (`types/memory.ts`)

### `Memory`
Core photo/memory object with 3D positioning and metadata.

```typescript
interface Memory {
  id: string;                        // Unique identifier
  title: string;                     // Memory title
  date: string;                      // ISO date (YYYY-MM-DD)
  description: string;               // Short description
  imageUrl?: string;                 // Optional image URL
  room: 'main' | 'firstDate' | 'adventures' | 'specialMoments';
  frameStyle: 'classic' | 'modern' | 'ornate';
  position: [number, number, number]; // 3D coordinates
  rotation: [number, number, number]; // Euler angles
  size: { width: number; height: number };
  tags?: string[];                   // Searchable tags
  emotion?: string;                  // Emotional context
  location?: string;                 // Physical location
  people?: string[];                 // People in photo
}
```

### `DateMilestone`
Important relationship milestones.

```typescript
interface DateMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  significance: string;
  emoji: string;
  category: 'first' | 'anniversary' | 'special' | 'adventure';
}
```

### `Story`
Long-form narratives for memories.

```typescript
interface Story {
  id: string;
  memoryId: string;                  // Links to Memory.id
  title: string;
  content: string;                   // Full story text
  author?: string;
  createdAt: string;
  mood?: 'happy' | 'nostalgic' | 'romantic' | 'adventurous' | 'peaceful';
}
```

### `RoomTheme`
Room configuration with themed memories.

```typescript
interface RoomTheme {
  id: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
  wallColor: string;
  floorPattern: 'checkerboard' | 'marble' | 'uniform';
  memoryIds: string[];
}
```

---

## 📊 Data Files

### `data/memories.ts`

**Total Memories: 10**
- **Main Gallery**: 3 memories
- **First Date Room**: 3 memories
- **Adventures Room**: 3 memories
- **Special Moments Room**: 3 memories

**Date Milestones: 8**
- First Date (Jan 15, 2023)
- First Valentine's Day (Feb 14, 2023)
- Made It Official (Mar 14, 2023)
- First Trip Together (Jun 1, 2023)
- Said "I Love You" (Aug 10, 2023)
- Thanksgiving with Family (Nov 23, 2023)
- One Year Anniversary (Jan 15, 2024)
- The Promise (Jun 1, 2024)

**Room Themes: 4**
- Main Gallery (🏛️)
- First Date (💕)
- Adventures (🌍)
- Special Moments (✨)

### `data/stories.ts`

**Total Stories: 5**
1. "The First Hello" - First meeting story
2. "Conquering Mountains Together" - Hiking adventure
3. "One Year of Us" - Anniversary reflection
4. "The Promise" - Commitment moment
5. "Spontaneous Beach Adventure" - Road trip story

---

## 🎣 `useMemories` Hook

Custom React hook for data access with memoization.

### Usage

```typescript
import { useMemories } from '@/hooks/useMemories';

function MyComponent() {
  const {
    allMemories,
    getMemoriesByRoom,
    getStoryByMemoryId,
    statistics,
  } = useMemories();

  const firstDateMemories = getMemoriesByRoom('firstDate');
  const story = getStoryByMemoryId('fd-001');
}
```

### Available Data

- `allMemories` - All memories
- `dateMilestones` - All milestones
- `roomThemes` - Room configurations
- `stories` - All stories
- `sortedMemories` - Chronologically sorted
- `recentMemories` - 5 most recent
- `earliestMemories` - 5 oldest
- `timeline` - Grouped by month
- `statistics` - Data statistics

### Available Functions

#### Room Filters
- `getMemoriesByRoom(room)` - Get memories for specific room
- `getStoriesByRoom(room)` - Get stories for room memories

#### Single Item Lookups
- `getMemoryById(id)` - Find memory by ID
- `getStoryByMemoryId(memoryId)` - Get story for memory
- `getRoomThemeById(id)` - Get room theme config

#### Milestone Filters
- `getMilestonesByDateRange(start, end)` - Filter by date
- `getMilestonesByCategory(category)` - Filter by type

#### Search Functions
- `searchMemoriesByTag(tag)` - Search by tag
- `searchMemories(query)` - Text search

---

## 📈 Statistics

The hook provides real-time statistics:

```typescript
const { statistics } = useMemories();

console.log(statistics);
// {
//   totalMemories: 10,
//   totalMilestones: 8,
//   totalStories: 5,
//   totalDays: 680,
//   roomCounts: { main: 3, firstDate: 3, adventures: 3, specialMoments: 3 },
//   firstDate: '2023-01-15',
//   latestMemory: '2024-06-01'
// }
```

---

## 🔄 Timeline Feature

Automatically groups memories and milestones by month:

```typescript
const { timeline } = useMemories();

timeline.forEach(entry => {
  console.log(entry.date);           // '2023-01'
  console.log(entry.memories);       // Memory[] for that month
  console.log(entry.milestones);     // DateMilestone[] for that month
});
```

---

## 🎨 Sample Memory Structure

```typescript
{
  id: 'fd-001',
  title: 'The First Hello',
  date: '2023-01-15',
  description: 'The moment our eyes first met at the coffee shop',
  room: 'firstDate',
  frameStyle: 'ornate',
  position: [-13.99, 2, 0],
  rotation: [0, Math.PI / 2, 0],
  size: { width: 1.5, height: 1.8 },
  tags: ['nervous', 'excited', 'coffee', 'first-impression'],
  emotion: 'nervous excitement',
  location: 'Downtown Coffee Shop',
  people: ['You', 'Me']
}
```

---

## 🚀 Adding New Memories

To add new memories, edit `data/memories.ts`:

```typescript
export const newMemory: Memory = {
  id: 'custom-001',
  title: 'Your Memory Title',
  date: '2024-12-01',
  description: 'Brief description',
  room: 'specialMoments',
  frameStyle: 'modern',
  position: [x, y, z],
  rotation: [0, 0, 0],
  size: { width: 1.2, height: 1.5 },
  tags: ['tag1', 'tag2'],
  emotion: 'joyful',
  location: 'Somewhere Special',
};
```

Then add to the appropriate room array and regenerate `allMemories`.

---

## 🔍 Search Examples

```typescript
const { searchMemories, searchMemoriesByTag } = useMemories();

// Text search
const coffeeMemories = searchMemories('coffee');
const beachMemories = searchMemories('beach');

// Tag search
const romanticMemories = searchMemoriesByTag('romantic');
const adventureMemories = searchMemoriesByTag('adventure');
```

---

## 💡 Why No Database?

**Our current setup is perfect because:**

✅ **Client-Side Only** - No server needed  
✅ **Type Safety** - Full TypeScript support  
✅ **Fast** - No network requests  
✅ **Simple** - No database configuration  
✅ **Memoized** - Optimized performance  
✅ **Portable** - Easy to deploy anywhere  
✅ **Flexible** - Easy to modify structure  

For a personal anniversary project with static content, TypeScript + JSON is ideal!

---

## 📦 Integration Ready

All data structures are ready to integrate with:
- PhotoFrame components (use Memory positions/sizes)
- Room components (use RoomTheme configurations)
- Modal views (display Story content)
- Timeline UI (use timeline entries)
- Search functionality (use search functions)

---

## 🎯 Next Steps

To use this data in the museum:

1. Import in Museum component: `import { useMemories } from '@/hooks/useMemories'`
2. Get room-specific memories: `const memories = getMemoriesByRoom('firstDate')`
3. Map to PhotoFrame components with Memory data
4. Display stories in modals when frames are clicked
5. Add timeline view for chronological exploration

The data structure is complete and production-ready! 🎉
