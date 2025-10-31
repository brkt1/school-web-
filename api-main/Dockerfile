# Django Backend Dockerfile
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    postgresql-client \
    build-essential \
    libpq-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Expose port
EXPOSE 8000

# Create startup script
RUN printf '#!/bin/bash\n\
set -e\n\
echo "Waiting for database connection..."\n\
# Wait for database to be ready (optional)\n\
sleep 2\n\
echo "Collecting static files..."\n\
python manage.py collectstatic --noinput || echo "Static collection skipped"\n\
echo "Running migrations..."\n\
python manage.py migrate || echo "Migration error - check logs"\n\
echo "Starting server on 0.0.0.0:8000..."\n\
exec python manage.py runserver 0.0.0.0:8000\n' > /app/start.sh && \
    chmod +x /app/start.sh

# Run startup script
CMD ["/app/start.sh"]

