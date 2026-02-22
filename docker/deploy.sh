#!/bin/bash
set -e

# Deployment script for MCP Tutorial
# Usage: ./deploy.sh [environment]
# Environments: dev, staging, production

ENVIRONMENT=${1:-dev}
PROJECT_NAME="mcp-tutorial"
DOCKER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$DOCKER_DIR")"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
check_docker() {
    if ! command -v docker &> /dev/null; then
        log_error "Docker is not installed. Please install Docker first."
        exit 1
    fi

    if ! command -v docker-compose &> /dev/null; then
        log_error "Docker Compose is not installed. Please install Docker Compose first."
        exit 1
    fi

    log_info "Docker and Docker Compose are installed"
}

# Build the application
build_app() {
    log_info "Building application for $ENVIRONMENT environment..."

    cd "$ROOT_DIR"

    if [ "$ENVIRONMENT" = "production" ]; then
        npm ci --only=production
    else
        npm ci
    fi

    npm run build

    log_info "Application built successfully"
}

# Build Docker images
build_docker() {
    log_info "Building Docker images for $ENVIRONMENT environment..."

    cd "$DOCKER_DIR"

    if [ "$ENVIRONMENT" = "production" ]; then
        docker-compose build --no-cache
    else
        docker-compose build
    fi

    log_info "Docker images built successfully"
}

# Stop existing containers
stop_containers() {
    log_info "Stopping existing containers..."

    cd "$DOCKER_DIR"
    docker-compose down 2>/dev/null || true

    log_info "Containers stopped"
}

# Start containers
start_containers() {
    log_info "Starting containers for $ENVIRONMENT environment..."

    cd "$DOCKER_DIR"

    if [ "$ENVIRONMENT" = "production" ]; then
        docker-compose up -d
    else
        docker-compose up -d
    fi

    log_info "Containers started"
}

# Wait for services to be healthy
wait_for_health() {
    log_info "Waiting for services to become healthy..."

    local max_attempts=30
    local attempt=1

    while [ $attempt -le $max_attempts ]; do
        if curl -s http://localhost/health > /dev/null 2>&1; then
            log_info "Services are healthy!"
            return 0
        fi

        log_warn "Waiting for services... (attempt $attempt/$max_attempts)"
        sleep 2
        ((attempt++))
    done

    log_error "Services did not become healthy in time"
    return 1
}

# Show logs
show_logs() {
    log_info "Showing recent logs..."
    cd "$DOCKER_DIR"
    docker-compose logs --tail=50
}

# Display deployment info
show_info() {
    log_info "Deployment complete!"
    echo ""
    echo "Services running:"
    docker-compose ps
    echo ""
    echo "Access the application at:"
    echo "  - HTTP:  http://localhost"
    echo "  - HTTPS: https://localhost (if SSL is configured)"
    echo ""
    echo "Useful commands:"
    echo "  - View logs: make logs"
    echo "  - Stop: make down"
    echo "  - Restart: make restart"
}

# Main deployment flow
main() {
    log_info "Starting deployment for $ENVIRONMENT environment..."

    check_docker
    build_app
    build_docker
    stop_containers
    start_containers

    if wait_for_health; then
        show_info
    else
        log_error "Deployment failed - services are not healthy"
        show_logs
        exit 1
    fi
}

# Run main function
main
