# Run the Project

## Installation

First, install the project dependencies:

```bash
npm install
```

Then, build the project:

```bash
npm run build
```

## Running the Project

To start the development server, use one of the following commands:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Once the server is running, open [http://localhost:3000](http://localhost:3000) to view and interact with the app.

This project is developed with a mobile-first approach. Although accessible on larger screens, it is optimized for smartphones.

## Biome Linter Commands

### Format Files
To format the files automatically:

```bash
npx @biomejs/biome format --write ./app
```

### Lint Files
To lint the files:

```bash
npx @biomejs/biome lint ./app
```

### Run Format, Lint, and Apply Safe Fixes
To run format, lint, and apply safe corrections:

```bash
npx @biomejs/biome check --write ./app
```

### Check All Files for CI Environments
For running checks (format, lint, etc.) in CI environments:

```bash
npx @biomejs/biome ci ./app
```

---

Gobiloc team