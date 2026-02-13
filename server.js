import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import { existsSync } from 'fs';

const app = express();
const PORT = 3001;
const JSON_PATH = '/data/remote_assets.json';
// const JSON_PATH = '//home/abimael/projetos/AutomatedPythonVideoMaker/cache/remote_assets.json'

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

async function initJsonFile() {
  try {
    if (!existsSync(JSON_PATH)) {
      const defaultData = [];
      await fs.writeFile(JSON_PATH, JSON.stringify(defaultData, null, 2));
      console.log('✅ Initialized remote_assets.json');
    } else {
      console.log('✅ Found existing remote_assets.json');
    }
  } catch (error) {
    console.error('❌ Error initializing JSON file:', error.message);
  }
}

app.get('/api/assets', async (req, res) => {
  try {
    const data = await fs.readFile(JSON_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    res.json(parsed);
  } catch (error) {
    console.error('Error reading assets:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/assets', async (req, res) => {
  try {
    // Salva como array direto
    await fs.writeFile(JSON_PATH, JSON.stringify(req.body, null, 2));
    console.log('✅ Assets saved successfully');
    res.json({ success: true });
  } catch (error) {
    console.error('Error saving assets:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 API running on port ${PORT}`);
  await initJsonFile();
});