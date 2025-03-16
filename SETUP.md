# Documentation System Setup with pnpm

This is a quick setup guide for using the documentation generator with pnpm.

## Installation

1. Install the required dependencies:

```bash
# Add ContentLayer to your project
pnpm add contentlayer next-contentlayer

# Add tsx for running TypeScript files directly
pnpm add -D tsx
```

## Usage

1. Generate documentation based on your sidebar structure:

```bash
pnpm generate-docs
```

2. Start your development server to view the documentation:

```bash
pnpm dev
```

3. Navigate to `/docs` in your browser to view the documentation.

## Troubleshooting

If you encounter issues with the `tsx` package, you can alternatively use `ts-node`:

```bash
pnpm add -D ts-node
```

And update your package.json script:

```json
"generate-docs": "ts-node scripts/generate-docs.ts"
```

## Integrating with Your Workflow

After any changes to the sidebar structure in `src/components/template/sidebar/constant.ts`, run:

```bash
pnpm generate-docs
```

This will create any missing documentation files while preserving existing content.

## Building for Production

When building your project, ContentLayer will process all documentation files:

```bash
pnpm build
```

This will create optimized documentation pages as part of your Next.js build. 