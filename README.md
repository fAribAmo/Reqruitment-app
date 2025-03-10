# Reqruitment-app

## Overview
This project is a recruitment platform where users can create accounts, submit job applications, and recruiters can manage applications. The system is built with a monolithic architecture and follows best practices for authentication, error handling, and deployment.

## Technologies and Tools
- **Frontend:** Vue (Client-Side Rendering)
- **Backend:** Express (Node.js), Sequelize (ORM)
- **Authentication:** JWT for secure session management
- **Architecture:** Monolithic
- **Deployment:** Render


- **User Features:**
  - Authentication (login/register).
  - Profile and account management.
  - Submit job applications (skills, availability, personal information).

- **Recruiter Features:**
  - Authentication and secure access.
  - View list of job applications.
  - Manage application statuses.

## Installation & Setup
### 1. Clone the repository
Run the following command to clone the project:
```
git clone <repository-url>
cd recruitment-app
```

### 2. Frontend Setup
1. Navigate to the frontend folder and install dependencies:
```
   cd frontend
   npm install
```
2. Copy `.env.example` to `.env` and update the necessary values. 
```
cp .env.example .env 
```
3. Start the frontend application:
```
   npm run dev
```


### 3. Backend Setup
1. Navigate to the backend folder and install dependencies:
```
   cd backend
   npm install

2. Copy `.env.example` to `.env` and update the necessary values.
```
cp .env.example .env 
```
3. Start the backend server:
```
npm start
```

## 4. Setting Up the Database  
This project uses an **existing PostgreSQL database file**. Follow these steps to set up the database:  

1. Ensure that PostgreSQL is installed and running on your system.  
2. Locate the provided database dump file: `existing-database.sql`.  
3. Restore the database by running the following command:  
   ```
   psql -U <database_user> -d <database_name> -f existing-database.sql
   ```

## Notes
Ensure PostgreSQL is running before starting the backend.
Update .env files with actual values

## Running Tests
- To execute unit tests, use:
  ```
  npm test
  ```

## Deployment
- The project is deployed on Render.
- Use CI/CD pipeline for automatic deployment after successful testing.