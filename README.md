[![Netlify Status](https://api.netlify.com/api/v1/badges/928393ef-be29-435c-82ba-c1f59b3a2d6c/deploy-status)](https://app.netlify.com/sites/lightrailradar/deploys)

# [Light-Rail-Radar](https://lightrailradar.netlify.app)
A progressive web app (PWA) to quickly look up the estimated time of arrival (ETA) of Hong Kong Light Rail on your phone.

Hosted on Netlify: https://lightrailradar.netlify.app

> This project is started due to the lack of convenient ways to look up the next train of Hong Kong Light Rail. Many physical overhead displays in Light Rail platforms were taken down when MTR tried to streamline the look-up feature into its MTR Mobile app, but it failed miserably since the app is extremely inconvenient to use with a complicated UX and slow response time.

This progressive web app aims at providing the **quickest and easiest way possible** to look up the next light rail from your mobile.

<p align="center">
  <img src="https://github.com/LaurenceLungo/Light-Rail-Radar/blob/main/images/iPhone_UI.png" width="400" />
</p>

## Tech Stack

- **Framework**: [React](https://reactjs.org/) 18 with [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [Chakra UI](https://chakra-ui.com/)
- **Bootstrap**: [Create React App](https://github.com/facebook/create-react-app)
- **Package Manager**: [Yarn](https://classic.yarnpkg.com/en/docs/install)
- **Language**: TypeScript for type safety and better development experience

## Getting Started

### Prerequisites

Make sure you have the following installed on your development machine:

- [Node.js](https://nodejs.org/) (version >= 18)
- [Yarn](https://classic.yarnpkg.com/en/docs/install) (version >= 1.22.22)
- [Git](https://git-scm.com/)

### Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/LaurenceLungo/Light-Rail-Radar.git
cd Light-Rail-Radar
```

### Install Dependencies

Install the necessary dependencies using Yarn:

```bash
yarn install
```

### Running the Development Server

To start the development server, run the following command:

```bash
yarn start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits, and you will also see any TypeScript errors in the console.

### Running Tests

To run the test suite in interactive watch mode, use:

```bash
yarn test
```

For more information on running tests, see the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests).

### Building the App for Production

To build the app for production, use:

```bash
yarn build
```

This will create an optimized build in the `build` folder. The build is minified, and the filenames include the hashes. Your app is ready to be deployed!

For more information on deployment, see the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### Type Checking

To run TypeScript type checking without building:

```bash
npx tsc --noEmit
```

### Ejecting the App

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you need to customize the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project:

```bash
yarn eject
```

This will copy all the configuration files and transitive dependencies (webpack, Babel, ESLint, etc.) into your project so you have full control over them. At this point, you're on your own. You don't have to ever use `eject`, but it's available if needed.

## Project Structure

```
src/
├── components/          # React components
│   ├── footer/         # Footer components (station menu, favorites)
│   ├── homePage/       # Main page component
│   ├── languageSelector/ # Language toggle component
│   ├── platformCard/   # Platform display component
│   └── routeEntry/     # Route information component
├── context/            # React context (language management)
├── types/              # TypeScript type definitions
├── translations/       # Internationalization files
├── App.tsx            # Main app component
├── index.tsx          # App entry point
└── config.ts          # Application configuration
```

## Features

- **Real-time ETA**: Live updates of Light Rail arrival times
- **Multi-language Support**: English and Chinese (Traditional)
- **Station Selection**: Easy station picker with favorites
- **Location-based**: Automatic nearest station detection
- **Progressive Web App**: Installable on mobile devices
- **TypeScript**: Full type safety and better development experience
