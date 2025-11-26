# GO-TASK Client

A simple web client for a Todo App built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS. This project allows users to register, login, manage their profile, and create/manage their todo tasks. The UI uses shadcn/ui and Radix UI components.

## Features

- User authentication (register, login, logout)
- Profile management (view & edit profile)
- Task management (add, edit, delete, mark as completed)
- Responsive and modern UI

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set environment variables:**

   - Copy `.env.example` to `.env.local` (if available) and set `NEXT_PUBLIC_API_URL` to your backend API URL.
   - Example:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8080/api
     ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` : Next.js app directory (pages, layouts)
- `src/components/` : UI and feature components
- `src/hooks/` : Custom React hooks
- `src/lib/` : Utility functions

## Scripts

- `dev` : Start development server
- `build` : Build for production
- `start` : Start production server
- `lint` : Run ESLint

## Dependencies

- next, react, tailwindcss, axios, shadcn/ui, radix-ui, lucide-react, class-variance-authority, clsx

## License

MIT

---

_Backend API repo: [task-api](https://github.com/bertoale/task-api)_

_This project is part of the GO-TASK fullstack app._
