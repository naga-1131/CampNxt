import { MediaFile, Evaluation } from '../types';

// Mock data for prototype
const MOCK_MEDIA: MediaFile[] = [
  {
    id: '1',
    title: 'Sunset over the Alps',
    url: 'https://picsum.photos/seed/alps/1200/800',
    thumbnailUrl: 'https://picsum.photos/seed/alps/300/200',
    type: 'image',
    author: 'User:NatureLover',
    license: 'CC BY-SA 4.0',
    description: 'A beautiful sunset captured from the summit of Mont Blanc.'
  },
  {
    id: '2',
    title: 'Urban Architecture in Berlin',
    url: 'https://picsum.photos/seed/berlin/1200/800',
    thumbnailUrl: 'https://picsum.photos/seed/berlin/300/200',
    type: 'image',
    author: 'User:CityExplorer',
    license: 'CC BY-SA 4.0',
    description: 'Modern architecture in the heart of Berlin.'
  },
  {
    id: '3',
    title: 'Forest Stream',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Mock audio
    thumbnailUrl: 'https://picsum.photos/seed/forest/300/200',
    type: 'audio',
    author: 'User:SoundScape',
    license: 'CC BY-SA 4.0',
    description: 'Relaxing sounds of a stream in the Black Forest.'
  },
  {
    id: '4',
    title: 'City Life Timelapse',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4', // Mock video
    thumbnailUrl: 'https://picsum.photos/seed/city/300/200',
    type: 'video',
    author: 'User:VideoMaker',
    license: 'CC BY-SA 4.0',
    description: 'A short timelapse of city traffic.'
  }
];

export const apiService = {
  getMediaList: async (): Promise<MediaFile[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_MEDIA;
  },

  getMediaById: async (id: string): Promise<MediaFile | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_MEDIA.find(m => m.id === id);
  },

  submitEvaluation: async (evaluation: Evaluation): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Evaluation submitted:', evaluation);
  }
};
