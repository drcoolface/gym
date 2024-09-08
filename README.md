### Gym management prototype

--- Features

# Consists of user management and plans management

# Fullstack NextJS app with TypeScript and Prisma

# Uses server side rendering

--- How to run

# Install node

# clone the repo

# `npm i` to install dependencies

# Create an .env file with `NEXTAUTH_SECRET = your_secret_key` (fill any combination of letters {used as secret for auth}) and

# `DATABASE_URL="postgresql://username:password@localhost:port/database_name"`

# run `npx prisma init` to initilize prisma client

# `npx prisma migrate dev --name init` to make the initial migration

# `npx ts-node prisma/seed.ts` for initial seed data

# run `npm run dev`

-- App gets up and running

# Login using` user_name: "janesmith", password: "password123"`
