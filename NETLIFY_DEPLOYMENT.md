# Deploy on Netlify

This project is now configured for **Netlify deployment** with serverless functions!

## Quick Deploy

### 1. Connect your repository to Netlify
- Go to https://app.netlify.com
- Click "New site from Git"
- Connect your GitHub repository
- Netlify will auto-detect the `netlify.toml` config

### 2. Set Environment Variables
- In Netlify Dashboard, go to **Site settings** → **Build & deploy** → **Environment**
- Add the following environment variable:
  ```
  Key: WEATHER_API_KEY
  Value: [Your WeatherAPI key]
  ```

### 3. Deploy
- Netlify will automatically build and deploy when you push to GitHub
- Your app will be available at `https://your-site.netlify.app`

## How It Works

- **Frontend**: `Weather.html` is served as a static site
- **Backend**: `netlify/functions/weather.js` handles API requests as a serverless function
- **Security**: Your API key is stored in Netlify environment variables, never exposed

## Project Structure

```
.
├── Weather.html              # Frontend (Single Page App)
├── netlify/
│   └── functions/
│       └── weather.js        # Serverless function for API proxy
├── netlify.toml              # Netlify configuration
├── .env                      # Local development (not deployed)
├── server.js                 # Local development server
└── package.json              # Dependencies for local dev
```

## Local Development

```bash
# Test locally
npm start
# Visit http://localhost:3000
```

## Troubleshooting

**Still getting 404?**
- Clear browser cache (Ctrl+Shift+Delete)
- Wait 1-2 minutes for Netlify to redeploy
- Check the Netlify Deploy logs for errors

**API calls failing?**
- Verify `WEATHER_API_KEY` is set in Netlify environment variables
- Check browser console for specific error messages
- Visit your-site.netlify.app/.netlify/functions/weather?q=london to test the function directly
