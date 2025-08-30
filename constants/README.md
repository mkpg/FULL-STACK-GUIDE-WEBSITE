# Constants Directory Structure

This directory contains the split workshop content organized by logical sections for better maintainability and organization.

## File Structure

### Core Files
- **`index.ts`** - Main export file that imports and exports all sections
- **`sections.ts`** - Aggregates all workshop sections into a single array
- **`config.ts`** - Workshop configuration and metadata

### Section Files
- **`overview.ts`** - Overview of Full-Stack Development
- **`environment.ts`** - Setting Up Development Environment
- **`database.ts`** - MySQL Database Setup
- **`angular.ts`** - Angular: Concepts + Hands-On
- **`react.ts`** - React: Concepts + Hands-On
- **`php.ts`** - PHP API: Modern Backend Development
- **`java.ts`** - Java Servlet API: Enterprise-Grade Backend Development
- **`connection.ts`** - Connecting Frontend & Backend
- **`project.ts`** - Mini Project
- **`challenges.ts`** - Advanced Challenges
- **`real-world.ts`** - Real-World Applications & Famous Websites

## Benefits of This Structure

1. **Maintainability**: Each section is in its own file, making it easier to edit and maintain
2. **Organization**: Logical grouping of related content
3. **Scalability**: Easy to add new sections or modify existing ones
4. **Collaboration**: Multiple developers can work on different sections simultaneously
5. **Version Control**: Better diff tracking and conflict resolution
6. **Code Splitting**: Potential for lazy loading sections in the future

## Adding New Sections

To add a new section:

1. Create a new file in this directory (e.g., `new-section.ts`)
2. Export a `Section` object following the existing pattern
3. Import it in `sections.ts`
4. Add it to the `SECTIONS` array

## Importing

The main application imports from the constants directory:

```typescript
import { SECTIONS } from './constants';
```

This maintains backward compatibility while providing a cleaner, more organized structure.
