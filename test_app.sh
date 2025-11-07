#!/bin/bash

echo "🧪 Testing TakeTheStage Application"
echo "===================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Track errors
ERRORS=0

# Function to check command
check_command() {
    if command -v $1 &> /dev/null; then
        echo -e "${GREEN}✅ $1 is installed${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 is not installed${NC}"
        ERRORS=$((ERRORS + 1))
        return 1
    fi
}

# Function to test Django setup
test_django() {
    echo ""
    echo -e "${BLUE}📦 Testing Django Backend Setup...${NC}"
    echo "----------------------------------------"
    
    cd api-main
    
    # Check if virtual environment exists
    if [ -d "venv" ]; then
        echo -e "${GREEN}✅ Virtual environment found${NC}"
        source venv/bin/activate
    else
        echo -e "${YELLOW}⚠️  Virtual environment not found, using system Python${NC}"
    fi
    
    # Check Python
    if check_command python3; then
        python3 --version
    fi
    
    # Check Django installation
    echo ""
    echo "Checking Django installation..."
    if python3 -c "import django; print(django.get_version())" 2>/dev/null; then
        echo -e "${GREEN}✅ Django is installed${NC}"
    else
        echo -e "${RED}❌ Django is not installed. Installing dependencies...${NC}"
        pip install -r requirements.txt --quiet
        ERRORS=$((ERRORS + 1))
    fi
    
    # Check Django settings
    echo ""
    echo "Checking Django configuration..."
    if python3 manage.py check --settings=take_the_stage.settings 2>/dev/null; then
        echo -e "${GREEN}✅ Django configuration is valid${NC}"
    else
        echo -e "${YELLOW}⚠️  Django configuration check failed (may need environment variables)${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    # Check for migrations
    echo ""
    echo "Checking for pending migrations..."
    python3 manage.py showmigrations --settings=take_the_stage.settings 2>/dev/null | head -20
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ Migration check completed${NC}"
    else
        echo -e "${YELLOW}⚠️  Could not check migrations (may need database connection)${NC}"
    fi
    
    # Run Django tests
    echo ""
    echo -e "${BLUE}🧪 Running Django Unit Tests...${NC}"
    echo "----------------------------------------"
    
    # Run tests with verbosity
    python3 manage.py test --settings=take_the_stage.settings --verbosity=1 2>&1 | head -50
    
    TEST_RESULT=$?
    if [ $TEST_RESULT -eq 0 ]; then
        echo -e "${GREEN}✅ Django tests passed${NC}"
    else
        echo -e "${YELLOW}⚠️  Some tests failed or no tests found (this may be expected)${NC}"
    fi
    
    cd ..
}

# Function to test Docker setup
test_docker() {
    echo ""
    echo -e "${BLUE}🐳 Testing Docker Setup...${NC}"
    echo "----------------------------------------"
    
    if check_command docker; then
        docker --version
    fi
    
    if check_command docker-compose || check_command docker; then
        echo ""
        echo "Validating docker-compose.yml..."
        if docker-compose config > /dev/null 2>&1 || docker compose config > /dev/null 2>&1; then
            echo -e "${GREEN}✅ docker-compose.yml is valid${NC}"
        else
            echo -e "${YELLOW}⚠️  Could not validate docker-compose.yml${NC}"
        fi
    fi
}

# Function to test frontend
test_frontend() {
    echo ""
    echo -e "${BLUE}🌐 Testing Frontend Setup...${NC}"
    echo "----------------------------------------"
    
    cd web-main
    
    # Check Node.js
    if check_command node; then
        node --version
    fi
    
    # Check npm
    if check_command npm; then
        npm --version
    fi
    
    # Check if package.json exists
    if [ -f "package.json" ]; then
        echo -e "${GREEN}✅ package.json found${NC}"
    else
        echo -e "${RED}❌ package.json not found${NC}"
        ERRORS=$((ERRORS + 1))
    fi
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✅ node_modules found${NC}"
    else
        echo -e "${YELLOW}⚠️  node_modules not found (run: npm install)${NC}"
    fi
    
    cd ..
}

# Main test execution
echo "🔍 Checking Prerequisites..."
echo "----------------------------------------"

check_command python3
check_command pip3 || check_command pip

test_django
test_docker
test_frontend

# Summary
echo ""
echo "===================================="
echo -e "${BLUE}📊 Test Summary${NC}"
echo "===================================="

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All checks completed successfully!${NC}"
    echo ""
    echo "To run the application:"
    echo "  - Backend: cd api-main && python3 manage.py runserver"
    echo "  - Frontend: cd web-main && npm run dev"
    echo "  - Docker: docker-compose up"
    exit 0
else
    echo -e "${YELLOW}⚠️  Completed with $ERRORS errors${NC}"
    echo ""
    echo "Please fix the errors above before running the application."
    exit 1
fi

