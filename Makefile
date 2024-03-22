-include .env.local

DOCKER = docker
DOCKER_COMPOSE = docker compose -f $(DOCKER_COMPOSE_FILE)
DOCKER_COMPOSE_FILE = docker-compose.yml
DATABASE=$(POSTGRES_DB)

DOCKER_COMPOSE_USER = user
DOCKER_COMPOSE_EXEC = $(DOCKER_COMPOSE) exec -T -u $(DOCKER_COMPOSE_USER)
DOCKER_COMPOSE_UP_OPT = -d --remove-orphans --force-recreate
DOCKER_COMPOSE_UP = $(DOCKER_COMPOSE) up $(DOCKER_COMPOSE_UP_OPT)

COMPOSER_OPTIONS =

PWD = $(shell pwd)

##
##
## docker
## -------
##

start: set-env
	@$(DOCKER_COMPOSE) up $(DOCKER_COMPOSE_UP_OPT)

stop: ## Stop the project
	@$(DOCKER_COMPOSE) stop
ps: ## See container status
	@$(DOCKER_COMPOSE) ps -a

DOCKER_SERVICE=
build: pull
	@$(DOCKER_COMPOSE) build --pull $(DOCKER_SERVICE)

pull:
	@$(DOCKER_COMPOSE) pull --quiet

DOCKER_OPT=
logs:
	@$(DOCKER_COMPOSE) logs -f $(DOCKER_OPT)

waiter:
	@echo 🔥🔥🔥 heavy and destructive command 🔥🔥🔥
	@echo "Will start in 5 seconds. Press ctrl + C to cancel."
	@sleep 5

hard-reset: waiter start
	@$(DOCKER_COMPOSE) kill
	@$(DOCKER_COMPOSE) down --volumes --remove-orphans

set-env:
	@if [ ! -f .env.local ]; then \
		touch .env.local; \
		echo "APP_ENV=dev" >> .env.local; \
	fi
	@sed -i 's/APP_ENV=.*/APP_ENV=$(APP_ENV)/' .env.local
	@EMOJI=$$(if [ "$(APP_ENV)" = "test" ]; then echo "✔️"; else echo "🛠️"; fi); \
	echo "$$EMOJI Environnement \033[32m$(APP_ENV)\033[0m"


##
## Linters
## -----
##
eslint:
	@$(YARN) lint:js
prettier: ## PRETTIER
	@$(YARN) prettier

qa-js: eslint prettier

.DEFAULT_GOAL := help
help:
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'
.PHONY: help
