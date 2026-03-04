# Setup Instructions

## Important Security Note
This Weather Dashboard requires an API key. **Never commit your API key to version control.**

## Environment Setup

### 1. Create `.env` file
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Add your API key
Edit `.env` and replace `your_api_key_here` with your actual API key from [weatherapi.com](https://www.weatherapi.com/):
```
WEATHER_API_KEY=39080a9ac4954adba3b165154252108
```

### 3. Set up Node.js backend (Recommended)
This protects your API key by proxying requests through a backend server.

Install Node.js dependencies:
```bash
npm install
```

Start the development server:
```bash
npm start
```

The app will be available at `http://localhost:3000`

## File Structure
```
Weather-App/
├── Weather.html           # Frontend UI
├── server.js             # Backend proxy (optional)
├── .env                  # Your API key (NOT committed)
├── .env.example          # Template for .env
├── .gitignore           # Prevents committing sensitive files
└── package.json         # Node.js dependencies
```

## Security Best Practices
✅ API key stored in `.env` (not in code)
✅ `.env` added to `.gitignore` (not committed to Git)
✅ Use backend proxy to hide API key from frontend
✅ Regularly rotate your API key

## Troubleshooting

**Q: Weather data not loading?**
- Verify your API key is correct in `.env`
- Check that your WeatherAPI account is active
- Look at browser console for error messages

**Q: "API key not found" error?**
- Ensure `.env` file exists in the project root
- Restart the development server after creating `.env`

## Revoking Compromised Keys
If you accidentally commit an API key:
1. Immediately revoke it at https://www.weatherapi.com/
2. Generate a new key
3. Update `.env` with the new key
4. Use `git filter-branch` to remove from history (if needed)
