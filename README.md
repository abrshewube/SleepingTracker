# Sleep Tracker

Sleep Tracker is a web application that allows users to track their sleep duration, rate their day, and add comments. This repository contains both the backend and frontend code for the application.

## Technologies Used

- Backend:
  - Express.js
  - Prisma ORM
  - PostgreSQL

- Frontend:
  - Next.js
  - Tailwind CSS
  - React Query

## Prerequisites

Before running the project, ensure that you have the following software installed on your machine:

- Node.js (v14 or higher)
- PostgreSQL

## Getting Started

Follow the steps below to set up and run the project on your local machine:

1. Clone the repository:

   ```bash
   git clone https://github.com/abrshewube/Sleeping_Tracker.git
   cd sleep-tracker

2.Install the dependencies:

cd backend
npm install

cd ../frontend
npm install

3. Set up the PostgreSQL database:

Create a new PostgreSQL database for the project.
Update the database connection details in the backend/prisma/.env file.


4. Run the database migrations:
cd backend
npx prisma migrate dev --name init


5. Start the backend server:

cd backend
npm run dev


The backend server will start running at http://localhost:3001.

6. Start the frontend development server:

cd frontend
npm run dev
  
  The frontend development server will start running at http://localhost:3000.

Open your web browser and visit http://localhost:3000 to access the Sleep Tracker application.


