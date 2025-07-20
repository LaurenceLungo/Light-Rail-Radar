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
- **Build Tool**: [Vite](https://vitejs.dev/)
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
yarn dev
```

This will run the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits, and you will also see any TypeScript errors in the console.

### Building the App for Production

To build the app for production, use:

```bash
yarn build
```

This will create an optimized build in the `dist` folder (default for Vite). The build is minified, and the filenames include the hashes. Your app is ready to be deployed!

### Previewing the Production Build

To locally preview the production build:

```bash
yarn preview
```

This will serve the contents of the `dist` folder at [http://localhost:4173](http://localhost:4173).

### Type Checking

To run TypeScript type checking without building:

```bash
npx tsc --noEmit
```

## Deployment (Netlify)

To deploy on Netlify, use the following settings:

- **Build command:** `yarn build`
- **Publish directory:** `dist`

Netlify will automatically serve the optimized static files from the `dist` directory after building.

## Project Structure

```
src/
├── components/
│   ├── footer/
│   │   ├── favStations/
│   │   └── stationMenu/
│   ├── homePage/
│   ├── languageSelector/
│   ├── platformCard/
│   └── routeEntry/
├── context/
├── types/
├── translations/
```

## Features

- **Real-time ETA**: Live updates of Light Rail arrival times
- **Multi-language Support**: English and Chinese (Traditional)
- **Station Selection**: Easy station picker with favorites
- **Location-based**: Automatic nearest station detection
- **Progressive Web App**: Installable on mobile devices
- **TypeScript**: Full type safety and better development experience
