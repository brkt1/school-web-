#!/bin/bash

# Replace these variables with your actual values
LOCAL_PROJECT_PATH="."
REMOTE_USERNAME="ttstadmin"
REMOTE_SERVER_IP="196.188.249.76"
REMOTE_DESTINATION="/home/ttstadmin/api"
PROJECT_NAME="api"
VENV_NAME="home/ttstadmin/api/venv"
FILE="/home/etech/nisir/MTH-Website/mth-api/.env"
MIGRATION_FILE="./migrate_all.sh"
# Prompt for the remote server password
sed -i 's/DEBUG=True/DEBUG=False/' "$FILE"

# Prompt for the remote server password
# read  -p "Enter the password for $REMOTE_USERNAME@$REMOTE_SERVER_IP: " SSH_PASSWORD
# echo ""
# Add a new line for better formatting

# Archive the local Django project
tar -czvf api.tar.gz -C "$LOCAL_PROJECT_PATH" --exclude-from=.deployignore * &&

# Transfer the archive to the remote server
scp api.tar.gz "$REMOTE_USERNAME@$REMOTE_SERVER_IP:$REMOTE_DESTINATION"

echo "----API Files copied to server, now will be extracted on the server------"

# Connect to the remote server via SSH
ssh -T "$REMOTE_USERNAME@$REMOTE_SERVER_IP" << EOF
    cd "$REMOTE_DESTINATION"

    # Extract the archive
    tar -xzvf api.tar.gz

    #Move the file on the project name source destination
    mv -f "${PROJECT_NAME}"/{.,}* .

    rmdir "$PROJECT_NAME"
    rm api.tar.gz

    # Activate the virtual environment
    source "$VENV_NAME/bin/activate"

    # Install dependencies
    pip install -r requirements.txt

    # Update Django settings
    # (Modify this part based on your specific settings)
   # sed -i 's/DEBUG = True/DEBUG = False/' "$PROJECT_NAME/settings.py"
   # sed -i 's/ALLOWED_HOSTS = \[\]/ALLOWED_HOSTS = ["your_domain_or_ip"]/'

    # Run database migrations
    source $MIGRATION_FILE


    # Collect static files
    # python manage.py collectstatic --noinput
    pm2 restart api

    # Restart the web server
    # (Modify this part based on your specific web server)
    # systemctl restart apache2  # Example for Apache
EOF

# Clean up local files
rm api.tar.gz
echo "####  Django API Deployment completed successfully! ####"
