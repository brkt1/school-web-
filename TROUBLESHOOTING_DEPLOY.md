# 🔧 Troubleshooting Render Deployment

## Common Issues and Solutions

### 1. Backend Deployment Failed

**Possible Causes:**
- Missing environment variables
- Database connection issues
- Dockerfile build errors
- Missing dependencies

**Solutions:**

#### Check Build Logs
1. Go to your service: `takethestage-api`
2. Click on "Events" or "Logs" tab
3. Look for error messages at the bottom

#### Common Fixes:

**Issue: SECRET_KEY missing**
- Solution: Already set to auto-generate in render.yaml
- If still failing, manually add in Render dashboard under Environment variables

**Issue: Database connection failed**
- Solution: Ensure database is associated with the Blueprint
- Check that `take_the_stage` database exists and is running

**Issue: Module not found / Import errors**
- Solution: Check that all packages are in `requirements.txt`
- Verify Dockerfile installs requirements correctly

**Issue: Migrations failed**
- Solution: This is OK during build - migrations run at startup
- Check startup logs, not build logs

### 2. Updated render.yaml

I've updated the `render.yaml` file with:
- ✅ Removed health check (was causing issues)
- ✅ Set default values for all env vars
- ✅ Fixed DEBUG value (must be string "False", not boolean)
- ✅ Added production URLs

### 3. Next Steps

1. **Commit and push the updated render.yaml:**
   ```bash
   git add render.yaml
   git commit -m "Fix render.yaml configuration"
   git push origin brkt1  # or your branch name
   ```

2. **In Render Dashboard:**
   - Go to your Blueprint
   - Click "Manual Sync" or wait for auto-sync
   - Click "Update" to apply changes

3. **If still failing:**
   - Check the build logs in Render
   - Share the error message and I'll help fix it

### 4. Manual Service Creation (Alternative)

If Blueprint keeps failing, create services manually:

1. **Create Backend:**
   - New + → Web Service
   - Connect repo
   - Root Directory: `api-main`
   - Dockerfile Path: `api-main/Dockerfile`
   - Environment: Docker
   - Add environment variables manually

2. **Create Frontend:**
   - Similar process
   - Root Directory: `web-main`
   - Dockerfile Path: `web-main/Dockerfile`

### 5. Check Logs Format

Look for these in logs:
- `✅ Successfully installed` = Good
- `ERROR` or `FAILED` = Problem
- `ModuleNotFoundError` = Missing dependency
- `OperationalError` = Database connection issue

## Quick Test Commands

Once deployed, test your services:

```bash
# Test backend
curl https://takethestage-api.onrender.com/admin

# Test frontend  
curl https://takethestage-web.onrender.com
```

Need more help? Share the specific error from the logs!

