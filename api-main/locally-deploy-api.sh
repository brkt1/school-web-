#!/bin/bash
VENV_NAME="/home/nisirtech/elearning/eTutor/eTutorEnv"
FILE="/home/yohannes/nisirtech/elearning/eTutor/etutor-api/api/.env"

source "$VENV_NAME/bin/activate"
# Prompt for the remote server password
sed -i 's/DEBUG=False/DEBUG=True/' "$FILE"

python manage.py makemigrations && python manage.py migrate

python manage.py runserver
