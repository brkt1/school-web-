# Render Auto-Deploy Guide

This guide will help you deploy both the Django backend and Next.js frontend to Render with automatic deployments.

## 📋 Prerequisites

1. **GitHub/GitLab/Bitbucket Account** - Your code needs to be in a Git repository
2. **Render Account** - Sign up at [render.com](https://render.com)
3. **PostgreSQL Database** - Already created on Render (you have this!)

## 🚀 Deployment Steps

### Step 1: Push Your Code to GitHub

1. Initialize git (if not already done):
```bash
cd "/home/becky/Downloads/Telegram Desktop/school web'"
git init
git add .
git commit -m "Initial commit with Docker and Render config"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin YOUR_GITHUB_REPO_URL
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render Using render.yaml (Recommended)

#### Option A: Blueprint Deployment (Easiest)

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect `render.yaml` and create both services automatically
5. Review the services and click **"Apply"**

#### Option B: Manual Service Creation

If you prefer to create services manually:

**Backend (Django):**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `takethestage-api`
   - **Environment**: `Docker`
   - **Region**: `Oregon (US West)`
   - **Branch**: `main`
   - **Root Directory**: `api-main`
   - **Dockerfile Path**: `api-main/Dockerfile`
   - **Docker Context**: `api-main`
   - **Build Command**: (leave empty - Docker handles this)
   - **Start Command**: (leave empty - Docker handles this)
4. Connect to existing PostgreSQL database:
   - Click **"Advanced"**
   - Under **"Environment Variables"**, add:
     - `DB_NAME` → From database: `take_the_stage.database`
     - `DB_USER` → From database: `take_the_stage.user`
     - `DB_PASSWORD` → From database: `take_the_stage.password`
     - `DB_HOST` → From database: `take_the_stage.host`
     - `DB_PORT` → From database: `take_the_stage.port`
5. Add other environment variables (see below)
6. Click **"Create Web Service"**

**Frontend (Next.js):**
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository (same repo)
3. Configure:
   - **Name**: `takethestage-web`
   - **Environment**: `Docker`
   - **Region**: `Oregon (US West)`
   - **Branch**: `main`
   - **Root Directory**: `web-main`
   - **Dockerfile Path**: `web-main/Dockerfile`
   - **Docker Context**: `web-main`
4. Add environment variables:
   - `NODE_ENV` → `production`
   - `NEXT_PUBLIC_API_URL` → Your backend URL (e.g., `https://takethestage-api.onrender.com`)
5. Click **"Create Web Service"**

### Step 3: Environment Variables

#### Backend Environment Variables (Add in Render Dashboard):

**Required:**
- `DEBUG` → `False` (for production)
- `SECRET_KEY` → Generate a secure key (Render can auto-generate)
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` → From database connection
- `DEVELOPMENT_URL` → Your backend URL
- `PRODUCTION_URL` → Your backend URL  
- `FRONT_END_URL_DEV` → Your frontend URL
- `FRONT_END_URL_PROD` → Your frontend URL

**Optional (but recommended):**
- `CHAPA_SECRET_KEY` → Your Chapa payment key
- `CHAPA_CALLBACK_URL` → `https://takethestage-api.onrender.com/chapa/callback`
- `CHAPA_SECRET` → Your Chapa secret
- `CHAPA_API_URL` → `https://api.chapa.co/v1`
- `HUNTER_IO_KEY` → Your Hunter.io API key
- `BREVO_API_KEY` → Your Brevo API key
- `WEB_GENERATOR_PATH` → `/opt/render/project/src/web-main` (or similar)

#### Frontend Environment Variables:

- `NODE_ENV` → `production`
- `NEXT_PUBLIC_API_URL` → `https://takethestage-api.onrender.com`

### Step 4: Enable Auto-Deploy

By default, Render auto-deploys when you push to the main branch. To verify:
1. Go to your service settings
2. Under **"Auto-Deploy"**, ensure it's enabled
3. Select the branch (usually `main`)

### Step 5: Initial Deployment

1. Render will automatically build and deploy
2. Watch the build logs in real-time
3. First deployment may take 5-10 minutes

## 🔧 Post-Deployment Configuration

### Security Configuration

The application implements comprehensive security measures to protect against common vulnerabilities:

#### 1. **CORS & ALLOWED_HOSTS Protection**
- Restricts ALLOWED_HOSTS to specific school domains (no wildcards)
- Configures CORS to only allow requests from authorized origins
- Prevents abuse by blocking unauthorized domains

**Default Allowed Domains:**
- `takethestage-api.onrender.com` (backend)
- `takethestage-web.onrender.com` (frontend)
- `takethestageplc.com`
- `takethestage.org`
- `localhost` and `127.0.0.1` (development only)

**Adding Custom Domains:**

If you need to add additional domains, set these environment variables in Render:

**Option 1: Environment Variables (Recommended)**
- `ALLOWED_HOSTS` → Comma-separated list (e.g., `"yourdomain.com,api.yourdomain.com"`)
- `CORS_ALLOWED_ORIGINS` → Comma-separated list (e.g., `"https://yourdomain.com,https://app.yourdomain.com"`)

**Option 2: Automatic Detection**
- The system automatically adds domains from `PRODUCTION_URL` and `FRONT_END_URL_PROD` environment variables

#### 2. **HTTPS/SSL Security**
- Automatic HTTP to HTTPS redirect (production only)
- HTTP Strict Transport Security (HSTS) with 1-year duration
- HSTS preload enabled for browser support
- Secure proxy SSL header configuration

#### 3. **Cookie Security**
- Session cookies: Secure, HttpOnly, SameSite=Lax
- CSRF cookies: Secure, HttpOnly, SameSite=Lax
- Prevents XSS and CSRF attacks

#### 4. **Security Headers**
- X-Frame-Options: DENY (prevents clickjacking)
- Content-Type-Nosniff (prevents MIME type sniffing)
- XSS Filter enabled
- Referrer Policy: strict-origin-when-cross-origin
- Cross-Origin-Opener-Policy: same-origin

#### 5. **API Rate Limiting**
- Anonymous users: 100 requests/hour
- Authenticated users: 1000 requests/hour
- Prevents API abuse and DDoS attacks

#### 6. **Password Security**
- Enhanced password validation (minimum 8 characters)
- Argon2 password hashing (most secure, with PBKDF2 fallback)
- Common password detection
- Alphanumeric requirement enforcement

#### 7. **File Upload Security**
- Maximum file size: ~12 MB
- Limited form fields (1000 max) to prevent DoS
- Secure file permissions (644 for files, 755 for directories)

#### 8. **Production Warnings**
- Error reporting configured for production
- Sensitive data protection in error messages
- Admin email notifications for critical errors

### Update Frontend API URL

Update `NEXT_PUBLIC_API_URL` in frontend environment variables to point to your deployed backend.

## 🐛 Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify database environment variables are correctly set
- Check that the database is running and accessible
- Ensure the database host allows connections from Render

**Static Files Not Loading:**
- Check that `collectstatic` runs successfully
- Verify `STATIC_ROOT` and `STATIC_URL` settings
- Ensure WhiteNoise is configured correctly

### Frontend Issues

**Build Fails:**
- Check build logs for specific errors
- Verify all dependencies are in `package.json`
- Ensure CKEditor5 and RichTextEditor build correctly

**API Connection Issues:**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check CORS settings on backend
- Ensure backend URL is accessible

## 📝 Notes

- **Free Tier Limits**: Free tier services spin down after 15 minutes of inactivity
- **Database Expiry**: Free database expires after 90 days (upgrade to paid)
- **Build Time**: First build takes longer (5-10 minutes)
- **Custom Domains**: You can add custom domains in service settings

## 🔄 Updating Your Deployment

1. Make changes to your code
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your changes"
   git push
   ```
3. Render will automatically detect changes and redeploy

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Docker on Render](https://render.com/docs/docker)
- [Environment Variables](https://render.com/docs/environment-variables)

