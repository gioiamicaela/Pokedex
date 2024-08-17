# Pokedex

Instructions to run project locally:
## Requirements

Before you start, make sure you have the following programs installed on your system:

- [Node.js](https://nodejs.org/) (recommended version: LTS)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

## Project Setup

### 1. Clone the Repository
First, clone the repository to your local machine using the following command:

git clone https://github.com/your-username/your-repository.git

### 2. Install Dependencies
Navigate to the project folder and run the following command to install the necessary dependencies:

npm install

### 3. Configure Environment Variables
Create a .env file in the root of the project and add the following environment variables. 
Front:
VITE_API_URL=

Back:
JWT_SECRET=
APP_PORT=
MONGODB_CONNECTION_URL=

### 4. Start the Development Server
Once the environment variables are set up, you can start the development server with the following command:
npm start
