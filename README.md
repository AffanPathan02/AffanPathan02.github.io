# Portfolio Game

An interactive web-based portfolio presented as a game using React and Anime.js.

## Features

- Interactive game-like portfolio experience
- Animated UI elements using Anime.js
- Responsive design for all devices
- Sections for skills, projects, about me, and contact information

## Technologies Used

- React 19
- Vite
- Anime.js
- Bun (package manager)
- CSS3 with custom animations

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd portfolio-game
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/components/` - React components
- `src/styles/` - Component-specific CSS files
- `src/App.jsx` - Main application entry point

## Customization

To customize this portfolio with your own information:

1. Update the sections in `GameWorld.jsx`
2. Add your projects and skills details
3. Modify colors in the CSS variables in `App.css`
4. Add your personal information in the about section

## Deployment

Build the project for production:

```bash
bun run build
```

The build files will be in the `dist` directory, ready to be deployed to any static site hosting service.

## License

MIT
