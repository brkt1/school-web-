# Backend Setup Instructions

## Issue Found

The Django server is currently running from a different directory than the codebase:
- **Server running from**: `/home/becky/Desktop/school management system /backend`
- **Current codebase**: `/home/becky/Downloads/Telegram Desktop/school web'/api-main`

This is causing 404 errors because the endpoints don't exist in the server's codebase.

## Solution

### Option 1: Restart Django Server from Correct Directory

1. Stop the current Django server (Ctrl+C in the terminal where it's running)

2. Navigate to the correct directory:
   ```bash
   cd "/home/becky/Downloads/Telegram Desktop/school web'/api-main"
   ```

3. Start the Django server:
   ```bash
   python3 manage.py runserver 8000
   ```

### Option 2: Use the Server from the Other Directory

If the server in `/home/becky/Desktop/school management system /backend` has the correct endpoints, update the frontend's `NEXT_PUBLIC_API_URL` environment variable to point to it.

## Frontend Proxy Configuration

The frontend is correctly configured with a proxy that:
- Routes `/api/*` requests through Next.js to avoid CORS
- Forwards requests to `http://localhost:8000` (or `NEXT_PUBLIC_API_URL`)

**Important**: After fixing the backend, restart the Next.js dev server:
```bash
cd web-main
npm run dev
```

## Testing

Once the backend is running correctly, test the endpoints:
```bash
curl http://localhost:8000/organization/cities
curl http://localhost:8000/lookup/levels
curl http://localhost:8000/organization/regions
```

These should return JSON data, not 404 errors.

