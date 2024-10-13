

# GOBILOC - readme Docker

This project uses Docker Compose to set up a development environment with a PostgreSQL database, pgAdmin, a backend API, and a frontend application.

## How It Works

### Database (PostgreSQL)
- Uses the official PostgreSQL 16.2 image
- Stores data in a named volume for persistence
- Sets up the database with a predefined user and password
- Exposes the default PostgreSQL port 5432

### pgAdmin
- Provides a graphical interface for managing the PostgreSQL database
- Connects to the PostgreSQL instance automatically
- Exposed on port 5050

### Backend API
- Built using Python and Django
- Runs on port 8000

### Frontend Application
- Built using React
- Serves on port 3000

## Setup Instructions

1. Clone this repository to your local machine.

2. Navigate to the project root directory in your terminal.

3. Run the following command to start all services:

   ```
   docker compose up -d
   ```

   Note: You must run this command from the root directory of the project.

4. Access pgAdmin at http://localhost:5050
5. Access the backend API at http://localhost:8000/admin
6. Access the frontend application at http://localhost:3000

## Important Notes

- Always run `docker compose up -d` from the project root directory.
- Make sure you have Docker Desktop installed.
- The project uses environment variables for sensitive information. Ensure these are properly set before running the containers.

## Environment Variables

The project uses the following environment variables:

- `POSTGRES_USER`: Username for the PostgreSQL database
- `POSTGRES_PW`: Password for the PostgreSQL database
- `PGADMIN_MAIL`: Email address for the pgAdmin account
- `PGADMIN_PW`: Password for the pgAdmin account

These variables should be set in your `.env` file in the project root directory.

## Best Practices

- Use Docker Compose for consistent development environments across team members.
- Keep sensitive information like database credentials in environment variables.
- Regularly update your Docker images to ensure security patches.

By following these instructions, you'll have a fully functional development environment ready to use.
