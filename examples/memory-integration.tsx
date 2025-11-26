// Example: How to integrate memory data into Museum component
// This file demonstrates the integration pattern - NOT for production use

import { useMemories } from '@/hooks/useMemories';
import PhotoFrame from '@/components/PhotoFrame';

export function MemoryIntegrationExample() {
  const { getMemoriesByRoom, getStoryByMemoryId } = useMemories();

  // Get memories for a specific room
  const firstDateMemories = getMemoriesByRoom('firstDate');

  return (
    <>
      {/* Example: Render PhotoFrames from memory data */}
      {firstDateMemories.map((memory) => {
        const story = getStoryByMemoryId(memory.id);
        
        return (
          <PhotoFrame
            key={memory.id}
            position={memory.position}
            rotation={memory.rotation}
            frameStyle={memory.frameStyle}
            caption={memory.title}
            date={memory.date}
            frameWidth={memory.size.width}
            frameHeight={memory.size.height}
            onClick={(data) => {
              // Show modal with memory details + story
              console.log('Memory:', memory);
              console.log('Story:', story);
            }}
          />
        );
      })}
    </>
  );
}

// Example: Timeline View Component
export function TimelineViewExample() {
  const { timeline, statistics } = useMemories();

  return (
    <div>
      <h2>Our Journey Together</h2>
      <p>Total Days: {statistics.totalDays}</p>
      <p>Total Memories: {statistics.totalMemories}</p>
      
      {timeline.map((entry) => (
        <div key={entry.date}>
          <h3>{entry.date}</h3>
          <ul>
            {entry.memories.map(memory => (
              <li key={memory.id}>{memory.title}</li>
            ))}
            {entry.milestones.map(milestone => (
              <li key={milestone.id}>
                {milestone.emoji} {milestone.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// Example: Search Interface
export function SearchExample() {
  const { searchMemories, searchMemoriesByTag } = useMemories();
  
  const handleSearch = (query: string) => {
    const results = searchMemories(query);
    console.log('Search results:', results);
  };

  const handleTagSearch = (tag: string) => {
    const results = searchMemoriesByTag(tag);
    console.log('Tag results:', results);
  };

  return null; // Example only
}

// Example: Room Navigator with Memory Counts
export function RoomNavigatorExample() {
  const { statistics, roomThemes } = useMemories();

  return (
    <div>
      {roomThemes.map((theme) => (
        <button key={theme.id}>
          {theme.emoji} {theme.name}
          <span>({statistics.roomCounts[theme.id as keyof typeof statistics.roomCounts]} memories)</span>
        </button>
      ))}
    </div>
  );
}

// Example: Story Modal Content
export function StoryModalExample({ memoryId }: { memoryId: string }) {
  const { getMemoryById, getStoryByMemoryId } = useMemories();
  
  const memory = getMemoryById(memoryId);
  const story = getStoryByMemoryId(memoryId);

  if (!memory) return null;

  return (
    <div>
      <h1>{memory.title}</h1>
      <p>{memory.date} • {memory.location}</p>
      <p>{memory.description}</p>
      
      {memory.tags && (
        <div>
          {memory.tags.map(tag => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
      )}

      {story && (
        <div>
          <h2>{story.title}</h2>
          <div style={{ whiteSpace: 'pre-line' }}>
            {story.content}
          </div>
        </div>
      )}
    </div>
  );
}
