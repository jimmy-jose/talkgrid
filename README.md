# TalkGrid - Augmentative and Alternative Communication (AAC) PWA

TalkGrid is a simple, modern, and installable Progressive Web App (PWA) designed to function as an Augmentative and Alternative Communication (AAC) tool. It provides a grid of customizable cards with icons and phrases, which can be spoken aloud using the browser's text-to-speech capabilities.

The entire application is a frontend-only, single-page application built with React and Tailwind CSS. All data is persisted in the browser's `localStorage`, requiring no backend or user accounts.

**Live Application URL:** [https://jimmy-jose.github.io/talkgrid/](https://jimmy-jose.github.io/talkgrid/)

## Features

- **Customizable Communication Grid:** A responsive 4x4 grid of cards, each with an icon and text.
- **Text-to-Speech:** Click a card to have the associated phrase spoken aloud.
- **Pagination:** "Next" and "Previous" buttons to navigate through multiple pages of cards.
- **PIN-Protected Settings:** A parent-focused settings page protected by a 4-digit PIN.
- **Card Management:** Add, edit, and delete communication cards.
- **Voice Selection:** Change the text-to-speech voice from a list of available system voices.
- **PIN Management:** Update the settings PIN.
- **Offline Functionality:** As a PWA, the app is cached by a service worker and can be used while offline.
- **Installable:** Can be installed on mobile and desktop devices for a native-like experience.

## Tech Stack

- **Framework:** [React](https://react.dev/) (with TypeScript)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
- **Data Persistence:** Browser `localStorage`

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- A package manager like `npm` or `yarn`

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/jimmy-jose/talkgrid.git
    cd talkgrid
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Running in Development Mode

To run the app locally with hot-reloading for development:

```bash
npm run dev
```

This will start a development server, typically at `http://localhost:5173`.

### Building for Production

To create a production-ready build of the application:

```bash
npm run build
```

The optimized static files will be placed in the `dist/` directory.

## Deployment to GitHub Pages

This project is configured for easy manual deployment to GitHub Pages.

### How to Deploy

After making and committing your changes, run the following single command:

```bash
npm run deploy
```

This command will automatically:
1.  Build the application for production with the correct asset paths for GitHub Pages (`--base /talkgrid/`).
2.  Push the contents of the `dist` directory to the `gh-pages` branch on your GitHub repository.

GitHub will then serve the site from that branch. Any updates to the `main` branch will not be live until you run `npm run deploy` again.
