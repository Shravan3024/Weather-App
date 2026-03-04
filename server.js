/*
 * Backend Server for Weather App
 * Proxies weather API requests to hide the API key from the frontend
 * 
 * Usage:
 *   npm install express cors dotenv
 *   npm start
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.WEATHER_API_KEY;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname)));

// Route to serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Weather.html'));
});

// API Proxy endpoint
app.get('/api/weather', async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const { q, days, aqi } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(q)}&days=${days || 3}&aqi=${aqi || 'yes'}&alerts=yes`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', apiKeyConfigured: !!API_KEY });
});

app.listen(PORT, () => {
  console.log(`✓ Weather App Server running at http://localhost:${PORT}`);
  console.log(`✓ API Key configured: ${API_KEY ? 'Yes' : 'No - Check your .env file'}`);
});
