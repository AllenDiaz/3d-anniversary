// Core memory/photo data structure
export interface Memory {
  id: string;
  title: string;
  date: string; // ISO format: YYYY-MM-DD
  description: string;
  imageUrl?: string; // Optional - will use gradient placeholder if not provided
  room: 'main' | 'firstDate' | 'adventures' | 'specialMoments';
  frameStyle: 'classic' | 'modern' | 'ornate';
  position: [number, number, number]; // 3D coordinates in museum
  rotation: [number, number, number]; // Euler angles in radians
  size: {
    width: number;
    height: number;
  };
  tags?: string[];
  emotion?: string;
  location?: string;
  people?: string[];
}

// Important relationship milestones
export interface DateMilestone {
  id: string;
  date: string; // ISO format
  title: string;
  description: string;
  significance: string;
  emoji: string;
  category: 'first' | 'anniversary' | 'special' | 'adventure';
}

// Long-form stories associated with memories
export interface Story {
  id: string;
  memoryId: string; // Links to Memory.id
  title: string;
  content: string; // Full story text
  author?: string;
  createdAt: string; // ISO format
  mood?: 'happy' | 'nostalgic' | 'romantic' | 'adventurous' | 'peaceful';
}

// Extended photo metadata
export interface PhotoMetadata {
  id: string;
  memoryId: string;
  caption: string;
  date: string;
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  people?: string[];
  mood?: string;
  weather?: string;
  camera?: string;
  tags?: string[];
}

// Room theme configuration
export interface RoomTheme {
  id: string;
  name: string;
  description: string;
  color: string;
  emoji: string;
  wallColor: string;
  floorPattern: 'checkerboard' | 'marble' | 'uniform';
  memoryIds: string[]; // References to Memory.id
}

// Timeline entry for chronological view
export interface TimelineEntry {
  date: string;
  memories: Memory[];
  milestones: DateMilestone[];
}
