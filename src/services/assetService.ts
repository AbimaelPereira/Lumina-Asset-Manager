const API_URL = '/api/assets';

interface MediaAsset {
  url: string;
  type: string;
  extension: string;
  lastUsed: string;
  invalid: boolean;
}

interface RemoteSlug {
  slug: string;
  description: string;
  media: MediaAsset[];
}

interface Slug {
  id: string;
  name: string;
  description: string;
  assets: any[];
  createdAt?: string;
}

interface AppConfig {
  mode: 'json' | 'mongodb';
  jsonPath: string;
  mongoConnection: string;
}

let cachedSlugs: Slug[] = [];
let cachedConfig: AppConfig = {
  mode: 'json',
  jsonPath: '/data/remote_assets.json',
  mongoConnection: ''
};

// Converte formato antigo para novo
const convertFromRemoteFormat = (remote: RemoteSlug[]): Slug[] => {
  return remote.map(item => ({
    id: item.slug,
    name: item.slug,
    description: item.description || '',
    assets: item.media.map((m, idx) => ({
      id: `${item.slug}_${idx}`,
      url: m.url,
      type: m.type === 'image' ? 'image' : m.type === 'video' ? 'video' : 'image',
      extension: m.extension || 'unknown',
      lastUsed: m.lastUsed || new Date().toISOString().split('T')[0],
      isInvalid: m.invalid || false
    })),
    createdAt: new Date().toISOString()
  }));
};

// Converte formato novo para antigo
const convertToRemoteFormat = (slugs: Slug[]): RemoteSlug[] => {
  return slugs.map(slug => ({
    slug: slug.name,
    description: slug.description,
    media: slug.assets.map(a => ({
      url: a.url,
      type: a.type,
      extension: a.extension,
      lastUsed: a.lastUsed,
      invalid: a.isInvalid
    }))
  }));
};

const getSlugs = (): Slug[] => {
  return cachedSlugs;
};

const loadSlugs = async (): Promise<Slug[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to load');
    const data = await response.json();
    
    // Se data é array, é o formato antigo
    if (Array.isArray(data)) {
      cachedSlugs = convertFromRemoteFormat(data);
    } else if (data.slugs) {
      cachedSlugs = data.slugs;
    } else {
      cachedSlugs = [];
    }
    
    return cachedSlugs;
  } catch (error) {
    console.error('Error loading:', error);
    return [];
  }
};

const saveSlugs = async (slugs: Slug[]): Promise<void> => {
  try {
    // Salva no formato antigo (array direto)
    const remoteFormat = convertToRemoteFormat(slugs);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(remoteFormat),
    });
    if (!response.ok) throw new Error('Failed to save');
    cachedSlugs = slugs;
  } catch (error) {
    console.error('Error saving:', error);
    throw error;
  }
};

const getSlugById = (id: string): Slug | undefined => {
  return cachedSlugs.find(s => s.id === id);
};

const updateSlug = async (id: string, updates: Partial<Slug>): Promise<void> => {
  const index = cachedSlugs.findIndex(s => s.id === id);
  if (index === -1) throw new Error('Slug not found');
  cachedSlugs[index] = { ...cachedSlugs[index], ...updates };
  await saveSlugs(cachedSlugs);
};

const deleteSlug = async (id: string): Promise<void> => {
  cachedSlugs = cachedSlugs.filter(s => s.id !== id);
  await saveSlugs(cachedSlugs);
};

const getConfig = (): AppConfig => {
  const stored = localStorage.getItem('lumina_config');
  if (stored) {
    try {
      cachedConfig = JSON.parse(stored);
    } catch (e) {
      console.error('Failed to parse config');
    }
  }
  return cachedConfig;
};

const saveConfig = (config: AppConfig): void => {
  cachedConfig = config;
  localStorage.setItem('lumina_config', JSON.stringify(config));
};

export const assetService = {
  getSlugs,
  loadSlugs,
  saveSlugs,
  getSlugById,
  updateSlug,
  deleteSlug,
  getConfig,
  saveConfig,
};