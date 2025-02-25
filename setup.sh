#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment..."

# Step 1: Install dependencies and build frontend
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
npm run build
cd ..

# Step 2: Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Step 3: Create Docker network if not exists
NETWORK_NAME="crud-network"
if ! docker network ls | grep -q "$NETWORK_NAME"; then
    echo "🌐 Creating Docker network: $NETWORK_NAME"
    docker network create $NETWORK_NAME
fi

# Step 4: Build Docker images
echo "🐳 Building Docker images..."
docker build -f devops/dockerfile.backend -t my-backend .
docker build -f devops/dockerfile.frontend -t my-frontend .
docker build -f devops/dockerfile.mongo -t my-mongo .

# Step 5: Set environment variables
export MONGO_URI="mongodb://testUser:testPass123@mongodb_secure:27017/crud_app?authSource=admin"

# Step 6: Stop and remove existing containers (if running)
echo "🛑 Stopping old containers..."
docker stop backend frontend mongodb_secure || true
docker rm backend frontend mongodb_secure || true

# Step 7: Run containers
echo "🚀 Starting new containers..."
docker run -d --name mongodb_secure --network $NETWORK_NAME -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=testUser \
  -e MONGO_INITDB_ROOT_PASSWORD=testPass123 \
  -e MONGO_INITDB_DATABASE=crud_app \
  my-mongo

sleep 5  # Ensure MongoDB is ready before starting backend

docker run -d --name backend --network $NETWORK_NAME -p 5000:5000 \
  --env MONGO_URI=$MONGO_URI \
  my-backend

docker run -d --name frontend --network $NETWORK_NAME -p 80:80 \
  my-frontend

# Step 8: Show logs for debugging
echo "📜 Checking backend logs..."
docker logs backend

# Step 9: Open in browser (Linux only)
if command -v xdg-open &>/dev/null; then
    echo "🌍 Opening http://localhost"
    xdg-open http://localhost
fi

echo "✅ Deployment completed successfully!"
