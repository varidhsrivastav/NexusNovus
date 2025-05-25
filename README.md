# Swafinix Project Development

## Project Overview

Welcome to the Swafinix project! This document provides an overview of the project structure, development guidelines, and best practices for contributing to this repository.

## Project Structure

The project follows a well-organized directory structure under the `src/` folder to maintain clarity and scalability.

```
src/
├── app/             # All frontend routes
├── config/          # Configuration files and environment settings
├── components/      # Shared UI components

├── context/         # React context API for state management
├── hooks/           # Custom React hooks
├── server-actions/  # Server-side actions using Next.js
├── vendor/          # Third-party API integrations
```
use ├── _components/     # for Individual components for specific modules
## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (LTS version recommended)
- Yarn or npm or bun or pnpm

### Installation

Clone the repository and install dependencies:

```sh
$ git clone https://github.com/shadow007213/Swafinix_WEB.git
$ cd Swafinix_WEB
$ npm install  # or yarn install or bun install or pnpm install
```

### Running the Development Server

Start the Next.js development server:

```sh
$ npm run dev  # or yarn dev or bun dev or pnpm dev
```

## SOPs for Writing Clean Code

To maintain high-quality code, follow these standard operating procedures:

### 1. Component Structure

- Place reusable components in the `components/` folder.
- Place individual components related to a specific feature/module in `_components/`.

### 2. Folder and File Naming Conventions

- Use **camelCase** for filenames (`customHook.js`).
- Use **PascalCase** for React components (`ButtonComponent.js`).
- Use **kebab-case** for route names (`dashboard-settings`).

### 3. Code Formatting

- Use Prettier for code formatting.
- Maintain proper indentation and spacing.
- Follow the ESLint rules configured in the project.
- Do not override default ts config rules.
- Use consistent naming conventions for variables, functions, and classes.
- Use meaningful variable names and avoid abbreviations.
- Use descriptive comments to explain complex logic.

### 4. State Management

- Use the `context/` folder for React Context API.
- Use custom hooks (`hooks/` folder) for reusable state logic.

### 5. API Integration

- All third-party API integrations should be placed in the `vendor/` folder.
- Use environment variables for API keys and sensitive data.

### 6. Server Actions

- Keep all server actions inside `server-actions/`.
- Follow proper error handling and async/await best practices.

### 7. Commit Message Guidelines

- Use meaningful commit messages.
- Follow this format:
  ```sh
  feat: add new login component
  fix: resolve bug in authentication
  refactor: improve dashboard UI
  ```

## Contribution Guidelines

- Create a feature branch before working on new changes.
- Always raise a pull request with a detailed description of changes.
- Follow coding standards mentioned in this document.
- Sharing of env variables should be done using a secure method such as environment variables or a secrets manager.
- Ensure that all secrets are stored securely and not exposed in the codebase.
# Swafinix_WEB
