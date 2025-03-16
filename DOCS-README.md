# Documentation System

This documentation system automatically generates MDX files based on the sidebar structure defined in `src/components/template/sidebar/constant.ts`. It uses ContentLayer to process MDX files and integrate them with Next.js.

## How It Works

1. The sidebar structure in `constant.ts` defines categories, subcategories, and activities
2. Running `pnpm generate-docs` automatically creates folder structures and MDX files for all items in the sidebar
3. ContentLayer processes these MDX files and makes them available to your Next.js application
4. The docs are displayed using the route `/docs/[...slug]`

## File Structure

The generated documentation follows this structure:

```
content/
  └── docs/
      ├── index.mdx              # Main index file
      ├── relay/                 # Category folder
      │   ├── index.mdx          # Category index
      │   ├── general/           # Subcategory folder
      │   │   ├── index.mdx      # Subcategory index
      │   │   ├── secondary-injection.mdx  # Activity file
      │   │   └── ...            # Other activity files
      │   └── ...                # Other subcategories
      └── ...                    # Other categories
```

## Adding New Documentation

1. Update the `constant.ts` file with new categories, subcategories, or activities
2. Run `pnpm generate-docs` to generate the new MDX files
3. Edit the generated MDX files with your content

The script will only create files that don't already exist, so your existing content won't be overwritten.

## URLs

The documentation URLs follow this pattern:

- Category: `/docs/[category]`
- Subcategory: `/docs/[category]/[subcategory]`
- Activity: `/docs/[category]/[subcategory]/[activity]`

For example: `/docs/relay/general/secondary-injection`

## Customizing MDX Files

You can customize the MDX template in `scripts/generate-docs.ts` to change the structure of newly generated files. The template includes:

- Frontmatter with title and description
- Headers and content sections
- Table for parameters
- Notes section
- Related activities section

## Dependencies

This system requires the following packages:
- contentlayer
- next-contentlayer
- ts-node (for running TypeScript scripts)

You can install them with:

```bash
pnpm add contentlayer next-contentlayer
pnpm add -D ts-node
```

## Updating the Sidebar

When you update `constant.ts`, run the generator to ensure documentation stays in sync:

```bash
pnpm generate-docs
``` 