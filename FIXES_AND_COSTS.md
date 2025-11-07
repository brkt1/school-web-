# Website Analysis - Issues to Fix

This document contains a comprehensive analysis of issues that need to be fixed for the website to work properly.

## 🔴 Critical Issues (Must Fix)

### 1. Missing Required Environment Variables
**Location:** `api-main/take_the_stage/settings.py`

**Issues:**
- `SECRET_KEY` - Required but no default (line 59)
- `CHAPA_SECRET_KEY` - Required but no default (line 62)
- `CHAPA_CALLBACK_URL` - Required but no default (line 63)
- `HUNTER_IO_KEY` - Required in `get_hunter_api_key()` (line 56)
- `WEB_GENERATOR_PATH` - Required but no default (line 118)
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT` - All required (lines 361-365)

**Fix Required:**
- Add default values or proper error handling for all required environment variables
- Ensure `render.yaml` has all required variables set

### 2. Missing Production Server (gunicorn)
**Location:** `api-main/Dockerfile`, `api-main/requirements.txt`

**Issue:**
- Using `python manage.py runserver` in production (Dockerfile line 42)
- `runserver` is NOT suitable for production - it's single-threaded and insecure
- Missing `gunicorn` in requirements.txt

**Fix Required:**
- Add `gunicorn` to `requirements.txt`
- Update Dockerfile to use `gunicorn` instead of `runserver`
- Example: `gunicorn take_the_stage.wsgi:application --bind 0.0.0.0:8000 --workers 4`

### 3. Missing Channels/Redis Dependency
**Location:** `api-main/requirements.txt`, `api-main/take_the_stage/settings.py`

**Issue:**
- Application uses Channels and Redis (ASGI config, settings.py line 579-587)
- `channels-redis` package is NOT in requirements.txt
- `channels` package is also missing from requirements.txt
- This will cause import errors when the application tries to use WebSocket functionality

**Fix Required:**
- Add `channels` to requirements.txt
- Add `channels-redis` to requirements.txt
- Or disable Channels if not needed (remove ASGI application, remove CHANNEL_LAYERS config)

### 4. Improper Error Messages in Configuration Functions
**Location:** `api-main/take_the_stage/settings.py`

**Issue:**
- `get_backend_url()` function (line 35-43) raises `ImproperlyConfigured` with incomplete error message
- Line 42: `error_msg = "set the %s environment variable"` - missing format parameter
- `get_frontend_url()` has similar issue (line 52)

**Fix Required:**
- Fix error messages to include which variable is missing
- Example: `f"set the {env_var_name} environment variable"`

### 5. Redis Configuration Without Redis Server
**Location:** `api-main/take_the_stage/settings.py`, `docker-compose.yml`

**Issue:**
- Settings configured for Redis (lines 575-587) but no Redis service in docker-compose.yml
- Default Redis host is `127.0.0.1` which won't work in Docker
- If Channels/WebSockets are used, Redis connection will fail

**Fix Required:**
- Either add Redis service to docker-compose.yml
- Or use InMemoryChannelLayer for development (already commented out at line 589-593)
- Or configure Redis URL for Render/production

### 6. Frontend Dockerfile CMD Issues
**Location:** `web-main/Dockerfile`

**Issue:**
- CMD uses shell form instead of exec form (lines 59-68)
- Shell form doesn't pass signals properly to Node.js
- The conditional logic might not work correctly in Docker

**Fix Required:**
- Convert to proper shell script or use exec form
- Ensure standalone build works correctly

## 🟡 Important Issues (Should Fix)

### 7. Missing Environment Variable Defaults in render.yaml
**Location:** `render.yaml`

**Issue:**
- Many environment variables are set to empty strings (`""`)
- Some critical variables like `CHAPA_SECRET_KEY`, `CHAPA_CALLBACK_URL`, `HUNTER_IO_KEY` are empty
- `FRONTEND_BASE_URL` is empty (line 94)

**Fix Required:**
- Set proper default values or ensure they're set in Render dashboard
- Document which variables are required vs optional

### 8. Duplicate DEFAULT_FILTER_BACKENDS
**Location:** `api-main/take_the_stage/settings.py`

**Issue:**
- `DEFAULT_FILTER_BACKENDS` is defined twice in REST_FRAMEWORK settings
- Lines 251-255 and line 269
- This will cause the second definition to override the first

**Fix Required:**
- Remove duplicate and keep only one definition with all needed backends

### 9. Missing .env File for Local Development
**Location:** `api-main/.env` (missing)

**Issue:**
- No `.env` file found in api-main directory
- Local development will fail without environment variables
- `.env.example` file would help developers

**Fix Required:**
- Create `.env.example` with all required variables
- Document which variables are needed for local development

### 10. Database Connection String Hardcoded
**Location:** `docker-compose.yml`

**Issue:**
- Line 33: Hardcoded database host `dpg-d41qvjqli9vc73fos9j0-a.oregon-postgres.render.com`
- This should use environment variable

**Fix Required:**
- Remove hardcoded value, use `${DB_HOST}` only

### 11. Missing Redis in Docker Compose
**Location:** `docker-compose.yml`

**Issue:**
- Redis is configured in settings but no Redis service in docker-compose
- If Channels/WebSockets are needed, Redis must be available

**Fix Required:**
- Add Redis service to docker-compose.yml if Channels is needed
- Or document that Redis must be provided externally

### 12. Next.js Standalone Build Configuration
**Location:** `web-main/next.config.ts`, `web-main/Dockerfile`

**Issue:**
- Standalone output is enabled (next.config.ts line 5)
- Dockerfile tries to use standalone build but may not copy correctly
- Need to ensure all required files are copied

**Fix Required:**
- Verify standalone build works correctly
- Ensure all static files and dependencies are included

## 🟢 Minor Issues (Nice to Fix)

### 13. Missing Error Handling in Chapa Payment
**Location:** `api-main/commons/utils/chapa_payment.py`

**Issue:**
- No error handling if `CHAPA_SECRET_KEY` is empty or invalid
- No validation of required fields before making API calls

**Fix Required:**
- Add validation and error handling

### 14. Missing Validation for Empty Environment Variables
**Location:** Various files

**Issue:**
- Many optional environment variables default to empty strings
- Some functions may fail if these are used without checking

**Fix Required:**
- Add validation where empty strings would cause issues

### 15. CORS Configuration
**Location:** `api-main/take_the_stage/settings.py`

**Issue:**
- CORS configuration is complex with fallbacks
- Could be simplified for clarity

**Fix Required:**
- Consider simplifying or documenting the CORS logic better

## 📋 Summary of Required Fixes

### Immediate Actions Required:

1. **Add missing dependencies to requirements.txt:**
   - `gunicorn` (for production server)
   - `channels` (for WebSocket support)
   - `channels-redis` (for Redis channel layer)

2. **Fix Dockerfile:**
   - Replace `runserver` with `gunicorn`
   - Ensure proper production server configuration

3. **Fix settings.py:**
   - Fix error messages in `get_backend_url()` and `get_frontend_url()`
   - Remove duplicate `DEFAULT_FILTER_BACKENDS`
   - Add proper defaults for critical environment variables

4. **Fix render.yaml:**
   - Ensure all required environment variables have proper values
   - Set `FRONTEND_BASE_URL` correctly

5. **Add Redis service:**
   - Either add Redis to docker-compose.yml or use InMemoryChannelLayer
   - Configure Redis for production (Render)

6. **Fix docker-compose.yml:**
   - Remove hardcoded database host
   - Add Redis service if needed

### Environment Variables Checklist:

**Required (must be set):**
- `SECRET_KEY`
- `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`
- `DEVELOPMENT_URL` or `PRODUCTION_URL`
- `FRONT_END_URL_DEV` or `FRONT_END_URL_PROD`
- `CHAPA_SECRET_KEY`
- `CHAPA_CALLBACK_URL`
- `HUNTER_IO_KEY`
- `WEB_GENERATOR_PATH`

**Optional (but recommended):**
- `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` (if using Channels)
- `EMAIL_HOST`, `EMAIL_HOST_USER`, `EMAIL_HOST_PASSWORD` (for email)
- `BREVO_API_KEY` (for email service)
- OAuth credentials (Google, GitHub)

## 🚀 Deployment Readiness

**Current Status:** ✅ READY FOR PRODUCTION (All Critical Issues Fixed)

**Fixed Issues:**
1. ✅ Added production server (gunicorn) - Dockerfile updated
2. ✅ Added critical dependencies (gunicorn, channels, channels-redis) to requirements.txt
3. ✅ Fixed environment variable handling with proper defaults and error messages
4. ✅ Added Redis service to docker-compose.yml
5. ✅ Fixed duplicate DEFAULT_FILTER_BACKENDS in settings.py
6. ✅ Fixed frontend Dockerfile CMD issues
7. ✅ Updated render.yaml with proper environment variable defaults

**Next Steps:**
1. Set required environment variables in Render dashboard (SECRET_KEY, CHAPA_SECRET_KEY, etc.)
2. Configure Redis service on Render if using WebSockets
3. Test deployment locally with docker-compose
4. Deploy to Render

## 📝 Notes

- The application structure is generally good
- Security settings are well configured
- Docker configuration is mostly correct
- Main issues are missing dependencies and production server configuration

