# Docker Quick Start Guide

## Quick Commands

### Using Make (Recommended)

```bash
cd docker

# View all available commands
make help

# Build and start
make build
make up

# Check status
make ps
make health

# View logs
make logs
make logs-nextjs
make logs-nginx

# Stop services
make down

# Restart services
make restart

# Clean everything
make clean
```

### Using Docker Compose Directly

```bash
cd docker

# Build and start
docker-compose up -d --build

# View status
docker-compose ps

# View logs
docker-compose logs -f

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build
```

### Using Deployment Script

```bash
cd docker

# Deploy to development
./deploy.sh dev

# Deploy to production
./deploy.sh production
```

## First Time Setup

1. **Configure environment** (optional):
   ```bash
   cd docker
   cp .env.example .env
   # Edit .env with your settings
   ```

2. **Build and start**:
   ```bash
   make build
   make up
   ```

3. **Verify deployment**:
   ```bash
   make health
   ```

4. **Access the application**:
   - Open http://localhost in your browser

## Common Workflows

### Development

```bash
# Start services
make up

# Watch logs
make logs

# Make code changes in ../src
# Changes will require rebuild:
make rebuild
```

### Production Deployment

```bash
# Deploy using script
./deploy.sh production

# Or manually
docker-compose up -d --build
make health
```

### Troubleshooting

```bash
# Check service status
make ps

# View logs
make logs

# Restart services
make restart

# Access Next.js container
make shell-nextjs

# Access nginx container
make shell-nginx

# Full clean and rebuild
make clean
make build
make up
```

## URLs

- **Application**: http://localhost
- **Next.js Direct**: http://localhost:3000
- **Health Check**: http://localhost/health
- **API Health**: http://localhost/api/health

## File Locations

- Docker files: `/Users/jun/Repositories/antin0de/mcp-tutorial/docker/`
- Application root: `/Users/jun/Repositories/antin0de/mcp-tutorial/`
- Logs: `docker logs mcp-tutorial-nextjs` or `docker logs mcp-tutorial-nginx`
