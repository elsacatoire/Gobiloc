# Biome Linter command

# format files
npx @biomejs/biome format --write ./app

# lint files
npx @biomejs/biome lint ./app

# run format, lint, etc. and apply the safe suggestions
npx @biomejs/biome check --write ./app

# check all files against format, lint, etc. in CI environments
npx @biomejs/biome ci ./app