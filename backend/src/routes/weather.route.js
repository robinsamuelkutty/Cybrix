import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/weather', (req, res) => {
  // Path to the Python script
  const pythonScriptPath = path.join(__dirname, '../../scripts/weather.py');

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
    res.status(500).json({ error: 'Failed to fetch weather data' });
  });

  // Handle the Python process closing
  pythonProcess.on('close', (code) => {
    if (code === 0) {
      // Split the output into temperature and weather
      const [temp, weather] = dataToSend.split(',');

      // Check for invalid data (e.g., -1,-1)
      if (temp === '-1' || weather === '-1') {
        console.error('Invalid data received from Python script');
        res.status(500).json({ error: 'Failed to fetch weather data' });
      } else {
        // Send the weather data as JSON
        res.json({ temp, weather });
        console.log('Weather data sent:', { temp, weather });
      }
    } else {
      console.error(`Python script exited with code ${code}`);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });
});

export default router;