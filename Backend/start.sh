#!/bin/bash

# Change to the eliza directory
cd eliza

# Check if GROK_API_KEY is set in .env
if ! grep -q "GROK_API_KEY=" .env || grep -q "GROK_API_KEY=$" .env; then
  echo "GROK_API_KEY not found in .env file. Please add your Grok API key."
  echo "You can get a Grok API key by subscribing to Grok AI at https://grok.x.ai/"
  read -p "Enter your Grok API key: " grok_key
  
  # Create a minimal .env file with the provided key
  cat > .env.minimal << EOL
# Minimal configuration for Eliza with Grok
SERVER_URL=http://localhost
SERVER_PORT=3000
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

# Update lockfile and install dependencies properly
echo "Installing dependencies with updated lockfile..."
pnpm install --no-frozen-lockfile

# Install specific missing packages globally first
echo "Installing global dependencies..."
npm install -g ts-node turbo

# Install project-specific dependencies
echo "Installing project dependencies..."
cd agent && pnpm install --no-frozen-lockfile
cd ..

# Build if needed
echo "Building Eliza..."
npx turbo run build --filter=!eliza-docs || pnpm build

# Start Eliza with the crypto sherpa character
echo "Starting Eliza with CryptoSherpa character..."
pnpm start --characters="characters/cryptosherpa.character.json"

# Print success message if Eliza server starts
if [ $? -eq 0 ]; then
  echo "✅ Eliza backend started successfully!"
  echo "You can access the web interface at: http://localhost:3000"
else
  echo "❌ There was an issue starting the Eliza backend."
  echo "Please check the logs above for more details."
fi 