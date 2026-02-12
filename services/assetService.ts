
import { Slug, AppConfig, PersistenceMode } from '../types';

const STORAGE_KEY = 'lumina_assets_data';
const CONFIG_KEY = 'lumina_config';

const INITIAL_DATA: Slug[] = [
  {
    id: '1',
    name: 'hero-banners',
    description: 'Banners used in the landing page main section.',
    assets: [
      { id: 'a1', url: 'https://picsum.photos/id/10/800/450', type: 'image', extension: 'jpg', lastUsed: '2023-10-25', isInvalid: false },
      { id: 'a2', url: 'https://picsum.photos/id/11/800/450', type: 'image', extension: 'jpg', lastUsed: '2023-10-24', isInvalid: false }
    ],
    createdAt: '2023-10-20'
  },
  {
    id: '2',
    name: 'product-vids',
    description: 'Product feature demonstrations.',
    assets: [],
    createdAt: '2023-10-22'
  }
];

const INITIAL_CONFIG: AppConfig = {
  mode: PersistenceMode.JSON,
  jsonPath: './data/remote_assets.json',
  mongoConnection: 'mongodb+srv://admin:pass@cluster.mongodb.net/assets'
};

export const assetService = {
  getSlugs: (): Slug[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_DATA;
  },

  saveSlugs: (slugs: Slug[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  },

  getConfig: (): AppConfig => {
    const config = localStorage.getItem(CONFIG_KEY);
    return config ? JSON.parse(config) : INITIAL_CONFIG;
  },

  saveConfig: (config: AppConfig) => {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  },

  getSlugById: (id: string): Slug | undefined => {
    const slugs = assetService.getSlugs();
    return slugs.find(s => s.id === id);
  }
};
