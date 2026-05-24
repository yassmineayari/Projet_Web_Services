#!/bin/bash

# Urban Traffic Management System - Initial Setup Script
# This script sets up the project, installs dependencies, and initializes Git

echo "🚀 Urban Traffic Management System - Setup Script"
echo "=================================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created (please configure database credentials)"
else
    echo "✅ .env file already exists"
fi
echo ""

# Initialize Git repository if it doesn't exist
if [ ! -d .git ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git config user.email "dev@traffic-system.com"
    git config user.name "Traffic Management Team"
    
    # Add all files
    git add .
    
    # Create initial commit
    git commit -m "feat: initial project setup with microservices architecture

- API Gateway with GraphQL (Port 3000)
- Authentication Service (Port 3001)
- Vehicles Service with GPS tracking (Port 3002)
- Traffic Service with density calculation (Port 3003)
- Incidents Service (Port 3004)
- Notifications Service (Port 3005)
- PostgreSQL database configuration
- TypeORM ORM integration
- JWT authentication
- Complete API documentation
- GraphQL test queries
- UML architecture diagrams"
    
    echo "✅ Git repository initialized"
    echo "   - Initial commit created"
    echo "   - Add remote: git remote add origin <repository-url>"
    echo "   - Push: git push -u origin main"
else
    echo "✅ Git repository already exists"
fi
echo ""

# Build project
echo "🔨 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "⚠️  Build failed, but this is optional for development"
fi
echo ""

echo "=================================================="
echo "✅ Setup Complete!"
echo "=================================================="
echo ""
echo "📋 Next Steps:"
echo "   1. Configure database credentials in .env"
echo "   2. Start PostgreSQL database"
echo "   3. Create database: createdb traffic_db"
echo "   4. Run: npm run start:all"
echo "   5. Access GraphQL: http://localhost:3000/graphql"
echo ""
echo "📖 Documentation:"
echo "   - README.md - Full documentation"
echo "   - SETUP.md - Setup and running guide"
echo "   - API_ENDPOINTS.md - REST API endpoints"
echo "   - GRAPHQL_QUERIES.md - GraphQL examples"
echo "   - ARCHITECTURE.md - Technical architecture"
echo "   - UML_DIAGRAMS.md - System diagrams"
echo ""
