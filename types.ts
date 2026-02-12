
export type MediaType = 'image' | 'video' | 'unknown';

export interface MediaAsset {
  id: string;
  url: string;
  type: MediaType;
  extension: string;
  lastUsed: string;
  isInvalid: boolean;
}

export interface Slug {
  id: string;
  name: string;
  description: string;
  assets: MediaAsset[];
  createdAt: string;
}

export enum PersistenceMode {
  JSON = 'JSON',
  MONGODB = 'MONGODB'
}

export interface AppConfig {
  mode: PersistenceMode;
  jsonPath: string;
  mongoConnection: string;
}
