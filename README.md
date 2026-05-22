# Math Web Application

A full-stack web application for learning mathematics, featuring interactive lessons, code editor, and quizzes on calculus and factoring concepts.

## MathWeb version 1.0

## Features

- **Calculus Learning**: Interactive calculus lessons and tutorials
- **Factoring Practice**: Dedicated factoring problems and explanations
- **Code Editor**: Built-in code editor for mathematical computation experiments
- **Quizzes**: Calculus and factoring quizzes to test your knowledge
- **Responsive UI**: Clean, intuitive navigation and sidebar menu

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

## Installation

1. **Clone or navigate to the project directory**:

   ```bash
   cd Math_Web
   ```

2. **Install root dependencies**:

   ```bash
   npm install
   ```

3. **Install client dependencies**:

   ```bash
   cd client
   npm install
   ```

4. **Install server dependencies**:
   ```bash
   cd ../server
   npm install
   ```

## Running the Project

### Start Both Frontend and Backend

From the root directory:

```bash
npm run dev
```

This command starts:

- **Frontend**: Vite development server (typically runs on `http://localhost:5173`)
- **Backend**: Express server (runs on `http://localhost:5000`)

### Start Frontend Only

```bash
cd client
npm run dev
```

### Start Backend Only

```bash
cd server
node server.js
```

### Build for Production

```bash
cd client
npm run build
```

The production build will be created in the `client/dist` directory.

## Project Structure

```
Math_Web/
├── client/                      # React frontend application
│   ├── src/
│   │   ├── app.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   ├── codeEditor.jsx      # Code editor component
│   │   ├── calculusHome/       # Calculus lesson section
│   │   ├── factoringHome/      # Factoring lesson section
│   │   ├── contentHome/        # Home/landing page
│   │   ├── Quizs/              # Quiz components
│   │   │   ├── calculusQuiz/   # Calculus quiz
│   │   │   └── factorQuiz/     # Factoring quiz
│   │   ├── navbarContent/      # Navigation bar
│   │   ├── sideBarMenu/        # Sidebar menu
│   │   └── mathWorkspace/      # Workspace for math exercises
│   ├── data/                   # Quiz and lesson data
│   ├── public/                 # Static assets
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
├── server/                      # Express backend server
│   ├── server.js               # Main server entry point
│   └── package.json
├── package.json
└── requirements.txt
```

## Available Scripts

### Client Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint to check code quality

## Packages Used

### Frontend Dependencies

| Package              | Version | Purpose               |
| -------------------- | ------- | --------------------- |
| **React**            | ^19.2.6 | UI library            |
| **React DOM**        | ^19.2.6 | React rendering       |
| **React Router DOM** | ^7.15.1 | Client-side routing   |
| **Ace Builds**       | ^1.44.0 | Code editor component |

### Frontend Dev Dependencies

| Package                         | Version | Purpose                        |
| ------------------------------- | ------- | ------------------------------ |
| **Vite**                        | ^8.0.12 | Build tool and dev server      |
| **@vitejs/plugin-react**        | ^6.0.1  | React plugin for Vite          |
| **Babel**                       | ^7.29.0 | JavaScript compiler            |
| **babel-plugin-react-compiler** | ^1.0.0  | React compilation optimization |
| **ESLint**                      | ^10.3.0 | Code linter                    |
| **ESLint Plugin React**         | ^7.1.1  | React-specific linting rules   |
| **ESLint Plugin React Refresh** | ^0.5.2  | Fast refresh linting support   |

### Backend Dependencies

| Package     | Version    | Purpose                       |
| ----------- | ---------- | ----------------------------- |
| **Express** | ^5.2.1     | Web server framework          |
| **CORS**    | (included) | Cross-Origin Resource Sharing |

## Development

### Code Quality

Run ESLint to check for code quality issues:

```bash
cd client
npm run lint
```

### Testing

To test that the backend is working:

```bash
curl http://localhost:5000/api/test
```

Expected response:

```json
{ "message": "Backend is working 🚀" }
```

## Troubleshooting

- **Port Already in Use**: If port 5000 or 5173 is already in use, modify the port numbers in `server/server.js` and `client/vite.config.js`
- **Dependencies Not Installing**: Delete `node_modules` folders and `package-lock.json` files, then reinstall:
  ```bash
  rm -rf client/node_modules server/node_modules node_modules
  rm -rf client/package-lock.json server/package-lock.json package-lock.json
  npm install
  cd client && npm install && cd ..
  cd server && npm install && cd ..
  ```

## License

ISC

## Support

For issues or questions, please refer to the project structure and documentation within individual components.
