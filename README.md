# Clubware.io

Welcome to Clubware.io, the innovative employee and inventory management software designed specifically for clubs and festivals. Our goal is to simplify the management of events and resources through an intuitive user interface and powerful backend services.

## Technology Stack

Clubware.io leverages modern web technologies to provide a responsive and scalable application. The frontend is developed with [Next.js](https://nextjs.org/docs) and [Mantine UI](https://mantine.dev/docs/), while the backend is built on [Supabase](https://supabase.com/docs).

## Getting Started

To start developing, follow these steps:

1. Clone the project to your local directory:

    ```
    git clone <Frontend-Repository-URL>
    ```

2. Install the required dependencies:

    ```
    npm install
    ```

3. Start the development server:

    ```
    npm run dev
    ```

The frontend is now accessible at `http://localhost:3010`.

## Configuration

To properly run the application, you need to set up the `.env.local` file with the necessary API keys. A sample configuration file `.env.local.example` is included in the project. Copy this file, edit it with your specific values, and rename it to `.env.local`.

## Project Structure and Style Guide

Our Clubware frontend project follows a specific structure and naming conventions guide to ensure consistency and readability in the code:

### Project Structure

-   **app/(features)**: Contains all feature-related modules. Each feature is placed in a folder named with parentheses, e.g., `(auth)`.
-   **app/\_components**: Global components that can be used across different parts of the application.
-   **app/\_styles**: Global styles, themes, and utility classes.
-   **app/\_types**: TypeScript types and interfaces for global use.
-   **app/\_utils**: Helper functions and utilities for the entire application.

### Naming Conventions

-   **Features**: Feature folders are named with parentheses, e.g., `(auth)`.
-   **Non-Route Folders**: Start with an underscore `_` for utility directories like `_components`, `_styles`, `_types`, and `_utils`.
-   **Index Files**: Use `index.tsx` or `index.ts` for component exports to simplify imports.

### Contribution Guidelines

Please follow our contribution guidelines to maintain the consistency and quality of the project. Specific guidelines for components, styles, types, and utilities are included in the Style Guide.

For more information on Mantine UI and Next.js, please visit their official documentation.
