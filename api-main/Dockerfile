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
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install Rust (required for kolo package)
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

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
echo "Starting Gunicorn server on 0.0.0.0:8000..."\n\
exec gunicorn take_the_stage.wsgi:application --bind 0.0.0.0:8000 --workers 4 --timeout 120 --access-logfile - --error-logfile -\n' > /app/start.sh && \
    chmod +x /app/start.sh

# Run startup script
CMD ["/app/start.sh"]

