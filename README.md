markdown
Copy code

# Gym Management Prototype

A full-stack Next.js application for managing users and plans with TypeScript and Prisma. This app uses server-side rendering to deliver a seamless user experience.

## Features

- **User Management**: Manage gym users and their details.
- **Plans Management**: Handle various gym plans and their details.

## How to Run

1. **Install Node.js**: Ensure that Node.js is installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Clone the Repository**:

   ```bash
   git clone <repository-url>

   ```

3. **Install Dependencies**:

```bash
cd <repository-directory>
npm install
```

4. **Setup Environment Variables: Create a .env file in the root directory with the following content**:

```env
NEXTAUTH_SECRET=your_secret_key
DATABASE_URL="postgresql://username:password@localhost:port/database_name"
```

5. **Initialize Prisma**:

```bash
npx prisma init
```

6. **Create Initial Migration**:

```bash
npx prisma migrate dev --name init
```

7. **Seed the Database**:

```bash
npx ts-node prisma/seed.ts
```

8. **Start the Development Server**:

```bash
npm run dev
```

9. **The application should now be up and running**.

Login Credentials
Use the following credentials to log in:

```
Username: janesmith
Password: password123
```

You can copy and paste this markdown directly into your GitHub README file.
