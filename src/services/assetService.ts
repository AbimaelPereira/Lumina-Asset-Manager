const API_URL = 'http://localhost:3001/api/assets';

const loadAssets = async (): Promise<any> => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Failed to load assets');
  return response.json();
};

const saveAssets = async (data: any): Promise<void> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to save assets');
};

export const assetService = {
  loadAssets,
  saveAssets,
};