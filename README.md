
# Todolist

This project showcases basic levels in full-stack development, highlighting skills in React for the front-end, and Express.js for the backend. It includes an API that interacts seamlessly with a PostgreSQL database to manage the functionality. The application also implements secure token-based authentication, demonstrating a solid understanding of user authentication and authorization workflows. This project serves as a comprehensive example of building a scalable and responsive application from the ground up.


## Features

- Authentication
- List and Task Management


## Screenshots

![App Screenshot](/Preview.png)
![Database](/Database-model.png)


## Tech Stack

**Client:** React, Vite, Styled-Components

**Server:** Node, Express, PostgreSQL, TypeScript


## Installation
- Frontend
```bash
  npm install
  npm run preview
```
- Backend
```bash
  npm install
  npm run build
  npm start
```
## Deployment

To deploy this project run

- Frontend
```bash
  docker build -t todolist-front
```
- Backend
```bash
  npm run build
  docker build -t todolist-back
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- Frontend
`VITE_API_BASE_URL`

- Backend
`DB_USER` `DB_HOST` `DB_DATABASE` `DB_PASSWORD` `DB_PORT` `EXPRESS_PORT` `JWT_SECRET_KEY`

