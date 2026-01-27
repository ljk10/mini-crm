# Mini CRM Backend

Backend Intern Assignment for Prysm Labs.
Built with NestJS, PostgreSQL, Prisma, and JWT Authentication.

## Features
- **Authentication**: JWT-based Login/Register (Admin & Employee roles).
- **Users**: Admin-only user management.
- **Customers**: CRUD operations with pagination.
- **Tasks**: Task management with role-based access (Employees see only their own tasks).
- **Documentation**: Full Swagger API documentation.

## Tech Stack
- NestJS (Node.js framework)
- PostgreSQL (Database)
- Prisma (ORM)
- Passport & JWT (Security)
- Swagger (API Docs)

## Setup Instructions

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (or Docker)

### 2. Installation
```bash
# Clone the repository
git clone <your-repo-link>
cd mini-crm-backend

# Install dependencies
npm install