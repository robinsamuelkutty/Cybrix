import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/recommendations', (req, res) => {
  // Path to the Python script
  const pythonScriptPath = path.join(__dirname, '../../scripts/recommendation.py');

  // Spawn a child process to run the Python script
  const pythonProcess = spawn('python', [pythonScriptPath]);

  let dataToSend = '';

  // Collect data from the Python script
  pythonProcess.stdout.on('data', (data) => {
    dataToSend += data.toString();
  });

  // Handle errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Python script error: ${data}`);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
  });

  // Handle the Python process closing
  pythonProcess.on('close', (code) => {
    if (!res.headersSent) {
      if (code === 0) {
        try {
          // Parse the recommendations from the Python script
          const recommendations = JSON.parse(dataToSend);
          res.json(recommendations);
        } catch (error) {
          console.error('Failed to parse recommendations:', error);
          res.status(500).json({ error: 'Failed to parse recommendations' });
        }
      } else {
        console.error(`Python script exited with code ${code}`);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
      }
    }
  });
});

export default router;