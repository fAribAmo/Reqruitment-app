# Recruitment App

## Overview
This project is a recruitment platform where users can create accounts, submit job applications, and recruiters can manage applications. The system follows a monolithic architecture and incorporates best practices for authentication, error handling, and deployment.

## Technologies and Tools
- **Frontend:** Vue (Client-Side Rendering)
- **Backend:** Express (Node.js), Sequelize (ORM)
- **Database:** PostgreSQL
- **Authentication:** JWT for secure session management
- **Architecture:** Monolithic
- **Deployment:** Render

## Features
### User Features:
- User authentication (register/login)
- Profile and account management
- Submit job applications (skills, availability, personal information)

### Recruiter Features:
- Secure authentication
- View list of job applications
- Manage application statuses

## Installation & Setup

### 1. Clone the Repository
Clone the project and navigate to the directory:
```sh
git clone <repository-url>
cd recruitment-app
```

### 2. Backend Setup
Navigate to the backend folder and install dependencies:
```sh
cd backend
npm install
```
Copy `.env.example` to `.env` and update the necessary values:
```sh
cp .env.example .env
```
Start the backend server:
```sh
npm start
```

### 3. Frontend Setup
Navigate to the frontend folder and install dependencies:
```sh
cd frontend
npm install
```
Copy `.env.example` to `.env` and update the necessary values:
```sh
cp .env.example .env
```
Start the frontend application:
```sh
npm run dev
```

### 4. Setting Up the Database
This project uses an **existing PostgreSQL database file**. Follow these steps to set up the database:

1. Ensure that PostgreSQL is installed and running on your system.
2. Locate the provided database dump file: `existing-database.sql`.
3. Restore the database by running the following command:
   ```sh
   psql -U <database_user> -d <database_name> -f existing-database.sql
   ```

## Notes
- Ensure **PostgreSQL is running** before starting the backend.
- Update `.env` files with actual values before running the application.

## Running Tests
To execute unit tests, use:
```sh
npm test
```

## Deployment
- The project is deployed on **Render**.
- The **CI/CD pipeline** ensures automatic deployment after successful testing.

Access the deployed application here: [Recruitment App](https://reqruitment-frontend.onrender.com/)
