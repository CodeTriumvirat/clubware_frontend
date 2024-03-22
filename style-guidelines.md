# Clubware Frontend Project Structure Style Guide - WIP

Welcome to the Clubware Frontend repository! This guide aims to provide clear instructions on our project structure and naming conventions to ensure consistency and readability across our codebase.

## Project Structure

Our project is organized into several key directories, each serving a specific purpose:

- **app/(features)**: Contains all feature-related modules. Features are self-contained units of functionality that are part of the application's interface or business logic. Each feature is placed in a folder named with parentheses, e.g., `(auth)`.

  Within each feature folder, we may have:
  - **Components**: Reusable components specific to this feature.
  - **Actions**: Redux actions, if applicable.
  - **Reducers**: Redux reducers, if applicable.
  - **Tests**: Tests specific to this feature.

- **app/_components**: This directory houses global components that can be used across different parts of the application. Components within this directory are further organized into subdirectories named after the components they contain.

  Each component has its own folder with an `index.tsx` file for easy import. E.g., `AppContainer/index.tsx`.

- **app/_styles**: Contains global styles, themes, and utility classes that can be applied throughout the application.

- **app/_types**: Stores TypeScript types and interfaces that are used globally across the application. Types are exported from an `index.ts` file for easy import.

- **app/_utils**: Includes utility functions and helpers that can be used in various parts of the application. These are not directly tied to any specific feature or component.

## Naming Conventions

- **Features**: Name feature folders using parentheses. This helps in distinguishing feature modules from other directories. E.g., `(auth)`.
- **Non-Route Folders**: Use underscores `_` as a prefix for non-route folders. These are typically utility directories like `_components`, `_styles`, `_types`, and `_utils`.
- **Index Files**: Use `index.tsx` or `index.ts` for component exports. This simplifies imports and keeps our code cleaner.

## Contribution Guidelines

- **Components**: When adding a new component, ensure it's placed in the correct directory. If it's a global component, it goes into `app/_components`. If it's feature-specific, it should be within the respective feature directory.
- **Styles**: Use the `app/_styles` directory for global styles. Component-specific styles should be kept within the same directory as the component.
- **Types and Interfaces**: Place global types in `app/_types`. Feature-specific types should be defined within the feature module.
- **Utilities**: Add global utility functions to `app/_utils`. Keep feature-specific utilities within the feature module.
