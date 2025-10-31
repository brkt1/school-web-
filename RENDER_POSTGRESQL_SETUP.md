# PostgreSQL Setup on Render - Step by Step Guide

## Step 1: Create a Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up for a free account (or log in if you already have one)

## Step 2: Create a PostgreSQL Database
1. After logging in, click **"New +"** button in the top right
2. Select **"PostgreSQL"** from the dropdown menu
3. Fill in the form:
   - **Name**: `takethestage-db` (or any name you prefer)
   - **Database**: `takethestage_db` (or leave default)
   - **User**: Leave default (Render will generate one)
   - **Region**: Choose closest to you (e.g., `Oregon (US West)`, `Frankfurt (EU Central)`)
   - **PostgreSQL Version**: Choose the latest stable version (usually `16` or `15`)
   - **Plan**: Start with **Free** plan (you can upgrade later)
   - Click **"Create Database"**

## Step 3: Get Connection Details
After the database is created (takes 1-2 minutes):

1. Click on your database name to open the dashboard
2. Go to the **"Connections"** tab
3. You'll see connection details. Look for:
   - **Internal Database URL** (for apps on Render)
   - **External Connection String** (for local development)

You'll need these details:
- **Host** (e.g., `dpg-xxxxx-a.oregon-postgres.render.com`)
- **Port** (usually `5432`)
- **Database Name** (the database you chose)
- **User** (the username Render generated)
- **Password** (Render will show this once - SAVE IT!)

## Step 4: Get the Connection String
The easiest way is to use the **External Connection String** which looks like:
```
postgresql://username:password@host:port/database
```

Or you can use individual values:
- **DB_HOST**: The hostname (without port)
- **DB_PORT**: Usually `5432`
- **DB_NAME**: Your database name
- **DB_USER**: Your username
- **DB_PASSWORD**: Your password

## Step 5: Update Your .env File
Copy the values from Render to your `.env` file in the `api-main` directory.

## Important Notes:
- ⚠️ **Save your password immediately** - Render only shows it once!
- 🔒 The database is accessible from anywhere on the internet (good for cloud apps)
- 💰 Free tier includes 90 days of free usage, then you may need to upgrade
- 📊 Free tier has 1GB storage and connection limits
- 🔄 Render provides automatic backups on paid plans

## Connection String Format:
If Render gives you a connection string like:
```
postgresql://user:pass@host:5432/dbname
```

Break it down for your .env:
- DB_USER = `user`
- DB_PASSWORD = `pass`
- DB_HOST = `host` (without `:5432`)
- DB_PORT = `5432`
- DB_NAME = `dbname`

