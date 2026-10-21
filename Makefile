.DEFAULT_GOAL := help
.PHONY: help setup lint test build release clean

help:        ## List available targets
	@grep -E '^[a-zA-Z_-]+:.*?## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS=":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

setup:       ## Install deps + git hooks
	./scripts/setup.sh
	git config core.hooksPath hooks/

lint:        ## Static analysis + format check
	./scripts/lint.sh

test:        ## Run full test suite
	./scripts/test.sh

build:       ## Build artifacts into dist/
	./scripts/build.sh

release:     ## Tag, generate RELEASE_MANIFEST.json + SHA256SUMS
	./scripts/release.sh

clean:       ## Remove build artifacts and caches
	rm -rf dist/ .cache/
