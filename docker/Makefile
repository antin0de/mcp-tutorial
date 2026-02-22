.PHONY: help build up down restart logs clean ps health shell

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build Docker images
	docker-compose build

up: ## Start all services
	docker-compose up -d

down: ## Stop all services
	docker-compose down

restart: ## Restart all services
	docker-compose restart

logs: ## View logs from all services
	docker-compose logs -f

logs-nextjs: ## View logs from Next.js service
	docker-compose logs -f nextjs

logs-nginx: ## View logs from nginx service
	docker-compose logs -f nginx

ps: ## Show running containers
	docker-compose ps

health: ## Check health status of services
	@echo "Checking service health..."
	@docker-compose ps
	@echo ""
	@echo "Health check endpoint:"
	@curl -s http://localhost/health || echo "Service not responding"

clean: ## Remove containers, networks, and images
	docker-compose down -v --rmi all

shell-nextjs: ## Open shell in Next.js container
	docker-compose exec nextjs sh

shell-nginx: ## Open shell in nginx container
	docker-compose exec nginx sh

rebuild: ## Rebuild and restart services
	docker-compose up -d --build
