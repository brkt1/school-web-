#!/usr/bin/env python3
"""
Helper script to update .env file with Render PostgreSQL connection details.
You can either:
1. Provide the full connection string from Render
2. Provide individual values

Usage:
    python update_env_from_render.py --connection-string "postgresql://user:pass@host:5432/dbname"
    OR
    python update_env_from_render.py --host your-host --user your-user --password your-password --database your-db
"""

import os
import re
import argparse
from urllib.parse import urlparse

def parse_connection_string(connection_string):
    """Parse PostgreSQL connection string into components."""
    # Handle postgresql:// or postgres://
    connection_string = connection_string.replace('postgres://', 'postgresql://')
    
    parsed = urlparse(connection_string)
    
    return {
        'user': parsed.username,
        'password': parsed.password,
        'host': parsed.hostname,
        'port': parsed.port or '5432',
        'database': parsed.path.lstrip('/')
    }

def update_env_file(env_path, db_config):
    """Update .env file with database configuration."""
    if not os.path.exists(env_path):
        print(f"Error: .env file not found at {env_path}")
        return False
    
    # Read current .env file
    with open(env_path, 'r') as f:
        lines = f.readlines()
    
    # Update or add database configuration
    updated = {
        'DB_NAME': False,
        'DB_USER': False,
        'DB_PASSWORD': False,
        'DB_HOST': False,
        'DB_PORT': False,
    }
    
    new_lines = []
    for line in lines:
        # Check if this is a database config line
        for key in updated.keys():
            if line.strip().startswith(f'{key}='):
                new_lines.append(f"{key}={db_config[key.lower()]}\n")
                updated[key] = True
                break
        else:
            new_lines.append(line)
    
    # Add missing database config if not found
    if not all(updated.values()):
        # Find where to insert (after Database Configuration comment or at end)
        insert_index = len(new_lines)
        for i, line in enumerate(new_lines):
            if 'Database Configuration' in line or 'DB_NAME' in line:
                insert_index = i + 1
                break
        
        # Insert missing configs
        for key in ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT']:
            if not updated[key]:
                new_lines.insert(insert_index, f"{key}={db_config[key.lower()]}\n")
                insert_index += 1
    
    # Write back
    with open(env_path, 'w') as f:
        f.writelines(new_lines)
    
    return True

def main():
    parser = argparse.ArgumentParser(description='Update .env file with Render PostgreSQL credentials')
    parser.add_argument('--connection-string', '-c', help='Full PostgreSQL connection string from Render')
    parser.add_argument('--host', help='Database host')
    parser.add_argument('--user', '-u', help='Database user')
    parser.add_argument('--password', '-p', help='Database password')
    parser.add_argument('--database', '-d', help='Database name')
    parser.add_argument('--port', help='Database port (default: 5432)', default='5432')
    parser.add_argument('--env-file', help='Path to .env file', default='.env')
    
    args = parser.parse_args()
    
    # Get database config
    if args.connection_string:
        db_config = parse_connection_string(args.connection_string)
        print("Parsed connection string:")
        for key, value in db_config.items():
            if key == 'password':
                print(f"  {key.upper()}: {'*' * len(value)}")
            else:
                print(f"  {key.upper()}: {value}")
    elif args.host and args.user and args.password and args.database:
        db_config = {
            'host': args.host,
            'user': args.user,
            'password': args.password,
            'database': args.database,
            'port': args.port
        }
    else:
        print("Error: Either provide --connection-string or all of --host, --user, --password, --database")
        parser.print_help()
        return
    
    # Update .env file
    if update_env_file(args.env_file, db_config):
        print(f"\n✅ Successfully updated {args.env_file}")
        print("\nUpdated database configuration:")
        print(f"  DB_NAME={db_config['database']}")
        print(f"  DB_USER={db_config['user']}")
        print(f"  DB_PASSWORD={'*' * len(db_config['password'])}")
        print(f"  DB_HOST={db_config['host']}")
        print(f"  DB_PORT={db_config['port']}")
    else:
        print(f"\n❌ Failed to update {args.env_file}")

if __name__ == '__main__':
    main()

