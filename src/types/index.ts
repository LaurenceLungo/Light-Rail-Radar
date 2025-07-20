import React from 'react';

// Station and platform types
export interface Station {
  name: string;
  zone: string;
  lat: number;
  long: number;
}

export interface StationConfig {
  [key: string]: Station;
}

export interface Platform {
  platform_id: string;
  platform_name: string;
  route_list: Route[];
}

export interface Route {
  route_id: string;
  route_name: string;
  direction: string;
  service_type: string;
  eta_list: ETA[];
  route_no: string;
  dest_ch: string;
  dest_en: string;
  time_ch: string;
  time_en: string;
  train_length: number;
  stop?: number;
}

export interface ETA {
  eta: string;
  service_type: string;
  destination: string;
  sequence: number;
  cars: number;
}

export interface ETAResponse {
  platform_list: Platform[];
  system_time: string;
}

// Language and translation types
export type Language = 'en' | 'zh';

export type PlatformFunction = (platformNumber: string) => string;
export type SecondsFunction = (seconds: number) => string;

export interface TranslationStrings {
  platform: PlatformFunction;
  endOfService: string;
  route: string;
  direction: string;
  arrivalTime: string;
  cars: string;
  updateTime: string;
  addToBookmark: string;
  removeFromBookmark: string;
  autoUpdateMessage: SecondsFunction;
  lineStopped: string;
  pwaInstallTitle: string;
  pwaInstallMessage: string;
  pwaInstallButton: string;
  pwaInstructionsTitle: string;
  pwaInstructionsMessage: string;
  pwaShareButton: string;
  pleaseSelect: string;
}

export interface Translations {
  en: TranslationStrings;
  zh: TranslationStrings;
}

// Context types
export interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

// Component prop types
export interface LanguageProviderProps {
  children: React.ReactNode;
}

export interface LanguageSelectorProps {}

export interface HomePageProps {}

export interface PlatformCardProps {
  platform: Platform;
}

export interface FooterProps {
  callback: (station: string) => void;
}

export interface FavStationsProps {
  currentStation: string | null;
  callback: (station: string) => void;
}

export interface StationMenuProps {
  callback: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
}

export interface RouteEntryProps {
  route: Route;
}

// Config types
export interface AppConfig {
  stationName: StationConfig;
  etaURL: string;
  refreshInterval: number;
  refreshIntervalSec: string;
} 