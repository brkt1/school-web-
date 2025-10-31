#!/bin/bash

# Configuration
remote_username="ttstadmin"
remote_server="196.188.249.76"
remote_path="/home/ttstadmin/web"

# Check if in Next.js project root
if [ ! -f package.json ]; then
  echo "Error: package.json not found."
  exit 1
fi

# Build the project locally
echo "Running local build..."
npm install
npm run build

# Optional: prepare standalone build (if configured in next.config.js)
# npm run build && mkdir -p out && cp -r .next/standalone/* out && cp -r public .next/static out/

# Package the necessary files
echo "Packaging files..."
tar -czvf nextjs_project.tar.gz \
  .next \
  public \
  package.json \
  package-lock.json \
  ecosystem.config.js \
  .env.production

# Transfer to server
echo "Copying build to server..."
scp nextjs_project.tar.gz "$remote_username@$remote_server:$remote_path"

# SSH into the server to deploy
ssh "$remote_username@$remote_server" << 'EOF'
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
  nvm use 22.16.0

  cd /home/ttstadmin/web || exit

  echo "Cleaning previous build..."
  rm -rf .next node_modules

  echo "Extracting new build..."
  tar -xzf nextjs_project.tar.gz
  rm nextjs_project.tar.gz

  echo "Installing production dependencies..."
  npm install --omit=dev

  echo "Restarting app with PM2..."
  pm2 restart web || pm2 start npm --name web -- start
EOF

# Cleanup local archive
rm nextjs_project.tar.gz

echo """
        **********************************************
        ***    Next.js App Deployed Successfully!   ***
        **********************************************
    """
