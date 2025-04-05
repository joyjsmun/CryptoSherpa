#!/bin/bash

# Change to the eliza directory
cd eliza

# Clear caches to ensure fresh character loading
rm -rf data/cache 2>/dev/null
rm -rf .db 2>/dev/null
echo "Cleared caches for fresh start"

# Check if we need to install dependencies
if [ ! -d "node_modules" ]; then
  echo "First run: Installing dependencies..."
  pnpm install --no-frozen-lockfile
else
  echo "Dependencies already installed, skipping main installation step."
fi

# Always install and build client-direct package which seems to be missing
echo "Installing critical dependencies..."
cd packages/client-direct
pnpm install --no-frozen-lockfile
pnpm build
cd ../..

# Make sure the agent's dependencies are also installed
echo "Installing agent dependencies..."
cd agent
pnpm install --no-frozen-lockfile 
cd ..

# Build all packages in the correct order
echo "Building all necessary packages..."
pnpm build

# Check if GROK_API_KEY is set in .env
if ! grep -q "GROK_API_KEY=" .env || grep -q "GROK_API_KEY=$" .env; then
  echo "GROK_API_KEY not found in .env file. Please add your Grok API key."
  echo "You can get a Grok API key by subscribing to Grok AI at https://grok.x.ai/"
  read -p "Enter your Grok API key: " grok_key
  
  # Create a minimal .env file with the provided key
  cat > .env.minimal << EOL
# Minimal configuration for Eliza with Grok
SERVER_URL=http://localhost
SERVER_PORT=3001
CACHE_STORE=database
PGLITE_DATA_DIR=memory://
DEFAULT_LOG_LEVEL=info
LOG_JSON_FORMAT=false

# Enable direct and web clients
USE_CHARACTER_STORAGE=true

# Grok Configuration
GROK_API_KEY=${grok_key}

# Required for server startup
EXPRESS_MAX_PAYLOAD=100kb
EOL

  # Use the minimal file
  cp .env.minimal .env
  echo "Created minimal .env file with Grok API key."
fi

# Start Eliza with the Bango character
echo "Starting Eliza with Bango character..."
pnpm start --characters="characters/bango.character.json"

# Print success message if Eliza server starts
if [ $? -eq 0 ]; then
  echo "✅ Eliza backend started successfully!"
  echo "You can access the web interface at: http://localhost:5173"
else
  echo "❌ There was an issue starting the Eliza backend."
  echo "Please check the logs above for more details."
fi 