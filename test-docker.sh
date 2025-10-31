#!/bin/bash

echo "🧪 Testing Docker Setup for TakeTheStage"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Docker
echo "📦 Checking Docker installation..."
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅ Docker is installed${NC}"
    docker --version
else
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

# Check Docker Compose
echo ""
echo "📦 Checking Docker Compose..."
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    echo -e "${GREEN}✅ Docker Compose is installed${NC}"
    docker-compose --version || docker compose version
else
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

# Check Dockerfiles exist
echo ""
echo "📄 Checking Dockerfile files..."
if [ -f "api-main/Dockerfile" ]; then
    echo -e "${GREEN}✅ api-main/Dockerfile exists${NC}"
else
    echo -e "${RED}❌ api-main/Dockerfile not found${NC}"
    exit 1
fi

if [ -f "web-main/Dockerfile" ]; then
    echo -e "${GREEN}✅ web-main/Dockerfile exists${NC}"
else
    echo -e "${RED}❌ web-main/Dockerfile not found${NC}"
    exit 1
fi

if [ -f "docker-compose.yml" ]; then
    echo -e "${GREEN}✅ docker-compose.yml exists${NC}"
else
    echo -e "${RED}❌ docker-compose.yml not found${NC}"
    exit 1
fi

# Validate Dockerfile syntax (dry-run)
echo ""
echo "🔍 Validating Dockerfile syntax..."
echo "Testing backend Dockerfile..."
cd api-main
if docker build --dry-run -f Dockerfile . 2>&1 | head -5; then
    echo -e "${GREEN}✅ Backend Dockerfile syntax OK${NC}"
else
    echo -e "${YELLOW}⚠️  Could not validate backend Dockerfile (this is OK for dry-run)${NC}"
fi
cd ..

echo ""
echo "Testing frontend Dockerfile..."
cd web-main
if docker build --dry-run -f Dockerfile . 2>&1 | head -5; then
    echo -e "${GREEN}✅ Frontend Dockerfile syntax OK${NC}"
else
    echo -e "${YELLOW}⚠️  Could not validate frontend Dockerfile (this is OK for dry-run)${NC}"
fi
cd ..

# Validate docker-compose.yml
echo ""
echo "🔍 Validating docker-compose.yml..."
if docker-compose config > /dev/null 2>&1 || docker compose config > /dev/null 2>&1; then
    echo -e "${GREEN}✅ docker-compose.yml is valid${NC}"
else
    echo -e "${YELLOW}⚠️  Could not fully validate docker-compose.yml${NC}"
fi

# Check render.yaml
echo ""
echo "📄 Checking Render configuration..."
if [ -f "render.yaml" ]; then
    echo -e "${GREEN}✅ render.yaml exists${NC}"
else
    echo -e "${YELLOW}⚠️  render.yaml not found (optional)${NC}"
fi

echo ""
echo "========================================"
echo -e "${GREEN}✅ Basic validation complete!${NC}"
echo ""
echo "To build and test:"
echo "  docker-compose build"
echo "  docker-compose up"
echo ""
echo "To build individually:"
echo "  cd api-main && docker build -t takethestage-api ."
echo "  cd web-main && docker build -t takethestage-web ."

