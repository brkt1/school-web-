# ⚡ Quick Deploy Reference

## 🐳 Local Testing

```bash
# Test both services locally
docker-compose up --build

# Or test individually
cd api-main && docker build -t api . && docker run -p 8000:8000 api
cd web-main && docker build -t web . && docker run -p 3000:3000 web
```

## 🚀 Deploy to Render (3 Steps)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create Blueprint on Render
- Go to https://dashboard.render.com
- Click **"New +"** → **"Blueprint"**
- Connect your GitHub repo
- Render auto-detects `render.yaml`

### 3. Add Environment Variables
**Backend:**
- `DEBUG` = `False`
- `SECRET_KEY` = (auto-generated or set manually)
- Database vars auto-connected from PostgreSQL

**Frontend:**
- `NEXT_PUBLIC_API_URL` = `https://takethestage-api.onrender.com`

## 📁 Files Created

✅ `api-main/Dockerfile` - Backend container
✅ `web-main/Dockerfile` - Frontend container  
✅ `docker-compose.yml` - Local development
✅ `render.yaml` - Auto-deploy config
✅ `.dockerignore` files - Optimize builds

## 🔗 After Deployment

- Backend: `https://takethestage-api.onrender.com`
- Frontend: `https://takethestage-web.onrender.com`
- Database: Already connected ✅

## ⚙️ Auto-Deploy

Push to `main` branch → Auto-deploys to Render! 🎉

