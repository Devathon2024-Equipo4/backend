# Santa Assistant Application

The purpose of this application is to manage Santa's data for Christmas

This application offers various functionalities, such as:
- Management of reindeers
- Management of children
- Management of behaviors
- Read letters from children
- Management of elves
- Management of routes (GPS)
- Management of calories (Cookies for Santa)

## Index

- [Santa Assistant Application](#santa-assistant-application)
  - [Index](#index)
  - [Technologies](#technologies)
  - [Installation](#installation)
  - [Use](#use)
  - [Api's Documentation](#apis-documentation)
  - [Testing](#testing)
  - [Project Structure](#project-structure)
  - [License](#license)
  - [Agradecimientos](#agradecimientos)

## Technologies

- **Node.js (Express)** - Express is a framework for JavaScript server development.
- **PostgreSQL** - Relational Database.
- **Prisma** - Database ORM.
- **Swagger** - Api's documentation.
- **Jest** - Testing framework for Javascript.

## Installation

1. Clone the repository.
   ```
   git clone https://github.com/Devathon2024-Equipo4/backend.git
   ```
2. Install the dependencies.
   ```
   npm install
   ```
3. Create and configure your environments

  - Create a .env file
  - Insert these environments
   ```
    PORT =
    DATABASE_URL = 
   ```
   **Info:**

   - PORT: number of port of your server
   - DATABASE_URL: url of your PostgreSQL database

## Use

To run Prisma migrations and create the tables in the database, you can follow these steps.
1. Generate the migration file.
   ```
    npx prisma migrate dev
   ```
2. Charge the seed data.
   ```
    npx prisma db seed
   ```
3. Start the server.
   ```
    npm run dev (development)

    or

    npm run start (production)
   ```
   The server will start on `http://localhost:3000`.

## Api's Documentation

Check the next page:

`http://localhost:3000/api-docs/`

## Testing

To run the tests, use the following command:
```
  npm run test
```

## Project Structure

```
├── controllers
├── doc
├── models
├── prisma
├── routes
├── tests
├── types
├── utils
└── .env
```

## License

This project is licensed under the [MIT](LICENSE) license.

## Agradecimientos

We would like to thank all the team members for their dedication, effort, and collaboration during this devathon. Thanks to their teamwork and creativity, we have been able to move forward and tackle challenges with enthusiasm.
We would also like to greatly thank Pedro for the opportunity to participate and learn under his guidance, which helped keep us on track and motivated at all times. We are happy with what we’ve accomplished together during this time!