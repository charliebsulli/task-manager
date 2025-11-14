# Task Manager Web App

A full-stack task management application built with a modern web stack, featuring a React-based frontend and a Node.js/Express backend.

## Live Demo

[View Live Application](https://task-manager-client-production.up.railway.app/)

## Getting Started

Prerequisites:

- Docker and Docker Compose must be installed on your system.

1.  Clone the repository:
    ```bash
    git clone https://github.com/charliebsulli/task-manager.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd task-manager
    ```
3.  Start the application using Docker Compose:
    ```bash
    docker compose up --build -d
    ```
4.  The application will be available at `http://localhost:3000`.

## Overview

A production-grade task management application demonstrating modern full-stack
development practices. Built to explore containerization, authentication patterns,
and type-safe development, this project showcases a complete CI/CD workflow from
local development to cloud deployment.

## Features

- **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT). Passwords are encrypted using bcrypt.
- **Task Management**: Create, Read, Update, and Delete (CRUD) operations for tasks.
- **Tagging System**: Organize tasks by creating and assigning custom tags.
- **Filtering**: Dynamically filter tasks by their completion status or associated tags.
- **RESTful API**: A well-defined API for seamless communication between the client and server.
- **Type-Safe Full Stack**: Shared TypeScript types across frontend and backend ensure
  data consistency and catch errors at compile time
- **Production-Ready Infrastructure**: Fully containerized with Docker, automated CI/CD
  pipeline, and comprehensive test coverage (Jest/Vitest)

## Why I Built This

This project was built to:

1. **Master full-stack TypeScript** - Implementing end-to-end type safety from database to UI
2. **Practice DevOps workflows** - Setting up Docker, CI/CD, and cloud deployment
3. **Explore authentication patterns** - Implementing secure JWT-based auth from scratch
4. **Learn testing best practices** - Writing comprehensive unit and integration tests

## Tech Stack

### Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- JSON Web Tokens (JWT) for authentication
- Jest for testing

### Frontend

- React (with Next.js)
- TypeScript
- TanStack Query for server state management
- Axios for HTTP requests
- Tailwind CSS for styling
- Vitest and React Testing Library for testing

### DevOps

- Docker / Docker Compose
- GitHub Actions for Continuous Integration

## Testing

The application includes comprehensive testing at multiple levels:

### Backend Testing (Jest)

- **Unit Tests**: Individual route handlers and middleware
- **Integration Tests**: Complete API workflows including authentication and CRUD operations
- **Coverage**: 83% of backend code covered by tests

```bash
cd server
npm test                  # Run all tests
npm run test:coverage    # Generate coverage report
```

### Frontend Testing (Vitest + React Testing Library)

- **Component Tests**: Individual React components with various props and states
- **Integration Tests**: Complete user flows like creating and filtering tasks

```bash
cd client
npm test                  # Run all tests
```

### Continuous Integration

GitHub Actions automatically runs all tests on every push to `main`, preventing
untested code from reaching production.

## Project Structure

The repository is a monorepo with three main directories:

- `client/`: Contains the Next.js frontend application.
- `server/`: Contains the Node.js/Express backend API.
- `shared/`: Contains shared TypeScript types used by both the client and server to ensure data consistency.

This structure promotes a clean separation of concerns and type safety across the full stack.

## Deployment

The application is configured for continuous integration using GitHub Actions (`.github/workflows/node.js.yml`). On every push to the `main` branch, the CI pipeline automatically runs all tests for both the client and server.

The application is fully containerized with Docker and is ready to be deployed to any cloud platform that supports Docker containers.

## Author

Created by Charlie Sullivan

- GitHub: [@charliebsulli](https://github.com/charliebsulli)
- LinkedIn: [Charlie Sullivan](https://www.linkedin.com/in/charliebsullivan/)
