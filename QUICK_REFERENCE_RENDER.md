# Quick Reference: Render PostgreSQL Setup

## 🚀 Quick Steps

### 1. Create Database on Render
- Go to: https://dashboard.render.com
- Click: **New +** → **PostgreSQL**
- Name: `takethestage-db`
- Plan: **Free**
- Click: **Create Database**

### 2. Get Connection Details (SAVE YOUR PASSWORD!)
After database is created:
1. Click on your database name
2. Go to **"Connections"** tab
3. Find **"External Connection String"** - it looks like:
   ```
   postgresql://username:password@dpg-xxxxx-a.oregon-postgres.render.com:5432/databasename
   ```

### 3. Update Your .env File

**Option A: Use the helper script (Easiest)**
```bash
cd "/home/becky/Downloads/Telegram Desktop/school web'/api-main"
python3 update_env_from_render.py --connection-string "YOUR_FULL_CONNECTION_STRING_HERE"
```

**Option B: Manual update**
Edit the `.env` file and update these lines:
```bash
DB_NAME=databasename              # Last part after the slash (/)
DB_USER=username                  # Part before the colon (:)
DB_PASSWORD=password              # Part between : and @
DB_HOST=dpg-xxxxx-a.oregon-postgres.render.com  # Part between @ and :
DB_PORT=5432                      # Usually 5432
```

### 4. Test Connection
```bash
cd "/home/becky/Downloads/Telegram Desktop/school web'/api-main"
source venv/bin/activate
python manage.py migrate
```

## 📋 Example

If Render gives you:
```
postgresql://takethestage_user:abc123xyz@dpg-xyz123-a.oregon-postgres.render.com:5432/takethestage_db
```

Your .env should have:
```env
DB_NAME=takethestage_db
DB_USER=takethestage_user
DB_PASSWORD=abc123xyz
DB_HOST=dpg-xyz123-a.oregon-postgres.render.com
DB_PORT=5432
```

## ⚠️ Important
- **Save your password immediately!** Render only shows it once.
- If you lose it, go to database settings → **Reset Password**
- The database will be available from anywhere on the internet

