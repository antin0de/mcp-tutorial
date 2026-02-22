# Docker Deployment Guide

This directory contains Docker configuration for deploying the MCP Tutorial website in production.

## Architecture

The deployment uses a multi-stage Docker build with nginx as a reverse proxy:

```
[Internet] -> [Nginx (Port 80/443)] -> [Next.js (Port 3000)]
```

## Files Overview

- **Dockerfile**: Multi-stage build (deps → builder → runner)
- **nginx.conf**: Production-optimized nginx configuration
- **docker-compose.yml**: Local development and testing setup
- **.dockerignore**: Optimizes build context by excluding unnecessary files

## Quick Start

### Prerequisites

- Docker 20.10+
- Docker Compose 2.0+

### Local Testing

1. **Build and start containers**:
   ```bash
   cd docker
   docker-compose up -d
   ```

2. **Access the application**:
   - Website: http://localhost
   - Next.js directly: http://localhost:3000

3. **View logs**:
   ```bash
   # All services
   docker-compose logs -f

   # Specific service
   docker-compose logs -f nextjs
   docker-compose logs -f nginx
   ```

4. **Stop containers**:
   ```bash
   docker-compose down
   ```

## Production Deployment

### Option 1: Using Docker Compose (Recommended for Single Server)

1. **Prepare environment**:
   ```bash
   # Create production environment file
   cat > .env.production << EOF
   NODE_ENV=production
   PORT=3000
   EOF
   ```

2. **Build and deploy**:
   ```bash
   cd docker
   docker-compose -f docker-compose.yml up -d
   ```

3. **Verify deployment**:
   ```bash
   docker-compose ps
   curl http://localhost/health
   ```

### Option 2: Using Docker Build (Manual Deployment)

1. **Build the image**:
   ```bash
   docker build -f docker/Dockerfile -t mcp-tutorial:latest ..
   ```

2. **Run the container**:
   ```bash
   docker run -d \
     --name mcp-tutorial \
     -p 3000:3000 \
     --restart unless-stopped \
     mcp-tutorial:latest
   ```

3. **With nginx proxy**:
   ```bash
   docker run -d \
     --name nginx \
     -p 80:80 \
     -v $(pwd)/docker/nginx.conf:/etc/nginx/nginx.conf:ro \
     --link mcp-tutorial:nextjs \
     nginx:1.25-alpine
   ```

### Option 3: Using Standalone Output (Optimized)

1. **Update next.config.ts**:
   ```typescript
   const nextConfig: NextConfig = {
     output: 'standalone',
   };
   ```

2. **Build and run**:
   ```bash
   npm run build
   docker build -f docker/Dockerfile -t mcp-tutorial:latest ..
   docker run -d -p 3000:3000 mcp-tutorial:latest
   ```

## Environment Variables

Configure these variables in `docker-compose.yml` or your deployment environment:

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Node environment |
| `PORT` | `3000` | Next.js port |
| `HOSTNAME` | `0.0.0.0` | Bind hostname |

## Health Checks

The containers include built-in health checks:

```bash
# Check health status
docker-compose ps
docker inspect --format='{{.State.Health.Status}}' mcp-tutorial-nextjs
```

## Performance Optimization

The deployment includes several optimizations:

1. **Multi-stage build**: Reduces final image size by excluding build tools
2. **Static file caching**: Nginx caches `_next/static` and `static` files
3. **Gzip compression**: Enabled in nginx for text-based content
4. **Non-root user**: Next.js runs as unprivileged user for security
5. **Connection pooling**: Nginx uses keepalive connections to Next.js

## Monitoring

### Logs

```bash
# Follow logs in real-time
docker-compose logs -f

# View last 100 lines
docker-compose logs --tail=100

# Logs for specific service
docker-compose logs -f nextjs
```

### Metrics

Access logs are available in nginx:
```bash
docker exec mcp-tutorial-nginx tail -f /var/log/nginx/access.log
docker exec mcp-tutorial-nginx tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Container won't start

```bash
# Check container logs
docker-compose logs nextjs

# Verify port availability
netstat -tuln | grep -E ':(80|3000)'

# Check disk space
df -h
```

### Build fails

```bash
# Clean build cache
docker builder prune

# Build with no cache
docker-compose build --no-cache
```

### Health check failing

```bash
# Test from inside container
docker exec mcp-tutorial-nextjs wget -O- http://localhost:3000

# Check network connectivity
docker network inspect docker_app-network
```

## SSL/TLS Configuration

For production with HTTPS, update `nginx.conf`:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # ... rest of config
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

Then mount certificates in docker-compose.yml:
```yaml
nginx:
  volumes:
    - ./nginx.conf:/etc/nginx/nginx.conf:ro
    - ./ssl:/etc/nginx/ssl:ro
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Build Docker image
        run: docker build -f docker/Dockerfile -t mcp-tutorial:${{ github.sha }} ..

      - name: Deploy to server
        run: |
          docker stop mcp-tutorial || true
          docker rm mcp-tutorial || true
          docker run -d --name mcp-tutorial -p 3000:3000 mcp-tutorial:${{ github.sha }}
```

## Security Considerations

1. **Run as non-root**: Next.js container uses unprivileged user
2. **Minimal base image**: Uses Alpine Linux to reduce attack surface
3. **Security headers**: Nginx adds X-Frame-Options, CSP headers
4. **No secrets in image**: Use environment variables or secrets management
5. **Regular updates**: Keep base images updated with security patches

## Maintenance

### Update deployment

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose up -d --build

# Clean up old images
docker image prune -af --filter "until=24h"
```

### Backup

```bash
# Backup volumes
docker run --rm \
  -v mcp-tutorial-data:/data \
  -v $(pwd)/backups:/backup \
  alpine tar czf /backup/backup-$(date +%Y%m%d).tar.gz /data
```

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Nginx Performance Tuning](https://www.nginx.com/blog/tuning-nginx/)
