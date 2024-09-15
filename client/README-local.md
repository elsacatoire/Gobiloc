# Biome Linter command

# format files
npx @biomejs/biome format --write ./src

# lint files
npx @biomejs/biome lint ./src

# run format, lint, etc. and apply the safe suggestions
npx @biomejs/biome check --write ./src

# check all files against format, lint, etc. in CI environments
npx @biomejs/biome ci ./src