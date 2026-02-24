# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Light-Rail-Radar is a Progressive Web App (PWA) for looking up Hong Kong Light Rail (MTR) estimated arrival times. It fetches real-time ETA data from the Hong Kong government data API and displays arrival times per platform at each station.

## Tech Stack

- **React 18** with **TypeScript**
- **Chakra UI** for component library
- **Vite** as build tool
- **Yarn** as package manager

## Common Commands

```bash
yarn dev        # Start development server (http://localhost:5173)
yarn build      # Build for production (outputs to dist/)
yarn preview    # Preview production build locally
npx tsc --noEmit # Run TypeScript type checking
```

## Architecture

The app uses a simple component-based architecture:

- **src/App.tsx**: Root component with ChakraProvider and LanguageProvider, lazy-loads HomePage
- **src/config.ts**: Contains all station data (68 stations with names, zones, and coordinates) and API configuration
- **src/types/index.ts**: TypeScript interfaces for Station, Platform, Route, ETA, and translation types

### Components

- **homePage**: Fetches and displays ETA data, auto-refreshes every 15 seconds using useInterval
- **footer**: Contains station selector dropdown, geolocation button for nearest station, and favorite stations
- **platformCard**: Renders individual platform information with arrival times
- **routeEntry**: Displays route details
- **languageSelector**: Language toggle (English/Chinese)

### Data Flow

1. User selects a station via dropdown or geolocation
2. HomePage fetches ETA from `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id={id}`
3. Data is displayed as PlatformCards with RouteEntries
4. Auto-refresh every 15 seconds

### Context

- **LanguageContext**: Manages language state ('en' | 'zh'), wraps entire app

### Translations

All UI strings are in `src/translations/translations.ts` with English and Traditional Chinese support.

## Key Files

- `src/config.ts`: Station configuration (station names in both languages, zones, lat/long coordinates)
- `src/components/homePage/homePage.tsx`: Main ETA fetching logic
- `src/components/footer/footer.tsx`: Station selection with geolocation (haversine distance calculation)
