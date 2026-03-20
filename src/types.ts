export type MediaType = 'image' | 'video' | 'audio';

export interface MediaFile {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  type: MediaType;
  author: string;
  license: string;
  description?: string;
}

export interface Evaluation {
  mediaId: string;
  score: number;
  comment?: string;
  jurorId: string;
  timestamp: string;
}

export interface Contest {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
