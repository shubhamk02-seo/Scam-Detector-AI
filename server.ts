import express, { Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { executeScamAnalysis, analyzeFallback } from './src/server/analyzerService.ts';

dotenv.config();

const app = express();
const PORT = 3000;

// Body parser configuration to support screenshot base64 uploads up to 15MB
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// POST /api/analyze endpoint
app.post('/api/analyze', async (req: Request, res: Response) => {
  try {
    const { type = 'text', text = '', imageBase64 = '' } = req.body;

    if (type === 'text' && (!text || text.trim().length === 0)) {
      res.status(400).json({ error: 'Please provide a message or text to analyze.' });
      return;
    }

    if (type === 'url' && (!text || text.trim().length === 0)) {
      res.status(400).json({ error: 'Please provide a valid URL to analyze.' });
      return;
    }

    if (type === 'screenshot' && (!imageBase64 || imageBase64.trim().length === 0)) {
      res.status(400).json({ error: 'Please upload a screenshot to analyze.' });
      return;
    }

    const result = await executeScamAnalysis(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('AI Analysis Error:', error);
    // Graceful fallback to heuristic analyzer if AI call fails
    const fallback = analyzeFallback(req.body.text || '', req.body.type || 'text', req.body.language || 'en');
    res.json(fallback);
  }
});

// Vite middleware for development & static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SCAMCHECK AI Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
