# Contributing Guide

Thank you for your interest in contributing to our project! This guide will help you understand our project structure and contribution guidelines.

## Project Structure

Our project follows a Next.js App Router structure with a clear separation of concerns. Here's how the project is organized:

```
src/
├── app/                    # Next.js App Router pages
│   └── [route]/           # Route-specific pages
│       └── page.tsx       # Page component
└── components/            # Reusable components
    └── [route]/          # Route-specific components
        ├── constant.ts    # Constants and arrays
        ├── type.ts       # TypeScript types and interfaces
        ├── form.tsx      # Form components
        ├── action.ts     # Server actions
        ├── valid.ts      # Validation schemas
        ├── model.ts      # Database schemas
        └── card.tsx      # Card components
```

### Component Directory Structure

Each feature/route in the application follows a consistent structure:

- `constant.ts`: Contains arrays and constants used throughout the feature
- `type.ts`: Contains TypeScript types and interfaces specific to the feature
- `form.tsx`: Form components using:
  - Zod for validation
  - React Hook Form for form handling
  - useActionState for form state management
  - Server Actions for form submission
- `action.ts`: Server actions and API endpoints
- `valid.ts`: Validation schemas and utilities
- `model.ts`: Database schemas and models
- `card.tsx`: Card components and layouts

## Development Guidelines

### Naming Conventions

- **Directories**: Use lowercase with hyphens (e.g., `user-profile/`)
- **Files**: Use lowercase with hyphens (e.g., `user-profile-card.tsx`)
- **Components**: Use PascalCase (e.g., `UserProfile`)
- **Functions**: Use PascalCase (e.g., `HandleSubmit`)
- **Variables**: Use camelCase (e.g., `userData`)
- **CSS Classes**: Use lowercase with hyphens (e.g., `user-card`)

### Code Style

1. **Imports Order**:
   ```typescript
   // 1. React and Next.js imports
   import { useState } from 'react'
   import { useRouter } from 'next/navigation'

   // 2. External library imports
   import { zodResolver } from '@hookform/resolvers/zod'

   // 3. Internal component imports
   import { Button } from '@/components/ui/button'

   // 4. Type imports
   import type { User } from '@/types'
   ```

2. **Component Structure**:
   - Use functional components with TypeScript
   - Include proper type definitions
   - Use proper prop interfaces

3. **State Management**:
   - Use React hooks for state management
   - Keep state as local as possible
   - Use context for global state when necessary

### Best Practices

1. **Error Handling**:
   - Implement proper error boundaries
   - Use try-catch blocks for async operations
   - Provide meaningful error messages

2. **Performance**:
   - Implement proper memoization when needed
   - Use React.memo for expensive components
   - Optimize images and assets

3. **Testing**:
   - Write unit tests for components
   - Include integration tests for critical paths
   - Use proper test naming conventions

4. **Documentation**:
   - Include JSDoc comments for complex functions
   - Document component props
   - Keep README up to date

5. **Accessibility**:
   - Include proper ARIA labels
   - Ensure keyboard navigation works
   - Maintain proper heading hierarchy

## Getting Started

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes using conventional commits
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Commit Messages

We follow conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Questions?

If you have any questions, please feel free to open an issue or contact the maintainers. 