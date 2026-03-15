## Project

Hong Kong Light Rail PWA — shows real-time ETA per platform at each station, fetched from the HK gov API.

## Stack

- React 18 + TypeScript, Chakra UI v3, Vite, Yarn
- lucide-react for icons, CSS Modules for component styles
- PWA via vite-plugin-pwa

## Commands

```bash
yarn dev        # dev server at http://localhost:5173
yarn build      # production build → dist/
npx tsc --noEmit # type check
yarn test       # run all tests once
yarn test:watch # run tests in watch mode
yarn test:coverage # run tests with coverage report
```

## Key Files

| File | Purpose |
|------|---------|
| `src/config.ts` | 68 stations (name, zone, lat/long), API URL, `refreshInterval` (ms) |
| `src/types/index.ts` | All TypeScript interfaces |
| `src/translations/translations.ts` | en/zh strings |
| `src/context/LanguageContext.tsx` | Language state (`'en' \| 'zh'`) |
| `src/components/ui/provider.tsx` | Chakra v3 provider (CLI-generated) |
| `src/components/ui/color-mode.tsx` | Color mode utilities (CLI-generated) |

## Component Overview

- **homePage** — fetches ETA, auto-refreshes via `useInterval(config.refreshInterval)`, renders `PlatformCard`s
- **footer** — `StationMenu` (Chakra `Combobox` with search), geolocation button (`LocateFixed` icon), `FavStations`
- **platformCard** — `Table` showing arrival times per platform; column headers use `textStyle="xs" fontWeight="bold"`
- **languageSelector** — fixed top-right: `ColorModeButton` + language `IconButton` (Languages icon from lucide), both fade out on scroll
- **routeEntry** — single table row for a route

## Data Flow

1. User picks station (combobox or geolocation)
2. `homePage` fetches `https://rt.data.gov.hk/v1/transport/mtr/lrt/getSchedule?station_id={id}`
3. Renders `PlatformCard` per platform, auto-refreshes every `config.refreshInterval` ms

## Notes

- Station names are bilingual strings e.g. `"蝴蝶Butterfly"` — no separate zh/en fields
- `clearStationSearch` window event resets the combobox (dispatched by geolocation button)
- Chakra v3 uses `Combobox`, `useListCollection`, `useFilter` from `@chakra-ui/react`
- After each change, update README.md if necessary
- After significant changes to the codebase, update this file to reflect the new state
