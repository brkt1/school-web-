#!/bin/bash
source venv/bin/activate
#./migrate_all.sh
python3 manage.py makemigrations authentication about_us  feedback file message_util notification text_chat multi_languages news company petition medias finance member eotc economy
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver 0.0.0.0:8000
