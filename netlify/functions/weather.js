/*
 * Netlify Function: Weather API Proxy
 * Located at: /.netlify/functions/weather
 */

const API_KEY = process.env.WEATHER_API_KEY;

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight CORS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true })
    };
  }

  try {
    // Get query parameters
    const { q, days = '3', aqi = 'yes' } = event.queryStringParameters || {};

    if (!q) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Query parameter "q" is required' })
      };
    }

    if (!API_KEY) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Fetch from WeatherAPI
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(q)}&days=${days}&aqi=${aqi}&alerts=yes`;
    
    const response = await fetch(apiUrl);

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify(errorData)
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Weather API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch weather data' })
    };
  }
};
