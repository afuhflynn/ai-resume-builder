#!/bin/bash

# Database Migration Script
# This script runs Prisma migrations and generates the client

set -e

echo "🔄 Running Prisma migrations..."

# Generate Prisma Client
pnpm exec prisma generate

# Run migrations
pnpm exec prisma migrate deploy

echo "✅ Migrations completed successfully!"
