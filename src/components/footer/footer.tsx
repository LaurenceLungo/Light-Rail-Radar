import React, { useState, useEffect, useContext } from "react";
import classes from "./footer.module.css";
import { Box, IconButton, HStack, VStack } from "@chakra-ui/react";
import { LocateFixed } from "lucide-react";
import StationMenu from "./stationMenu/stationMenu";
import FavStations from "./favStations/favStations";
import config from "../../config";
import { FooterProps, Station } from "../../types";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";

const Footer: React.FC<FooterProps> = ({ callback }) => {
    const [currentStation, setCurrentStation] = useState<string | null>(null);
    const [selectedStation, setSelectedStation] = useState<string>("unselected");
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language || 'zh';
    const t = translations[language];

    const stationMenuCallback = (station: string): void => {
        if (station === "unselected") {
            setCurrentStation(null);
            setSelectedStation("unselected");
        } else {
            setCurrentStation(station);
        }
        callback(station);
    };

    const favStationCallback = (station: string): void => {
        setCurrentStation(station);
        callback(station);
    };

    const getNearestStation = (userLat: number, userLong: number, stations: { [key: string]: Station }): string | null => {
        let nearestStation: string | null = null;
        let minDistance = Infinity;

        const haversine = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
            const toRad = (angle: number): number => (angle * Math.PI) / 180;
            const R = 6371; // Earth's radius in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        };

        for (const stationKey in stations) {
            const { lat, long } = stations[stationKey];
            const distance = haversine(userLat, userLong, lat, long);

            if (distance < minDistance) {
                minDistance = distance;
                nearestStation = stationKey;
            }
        }

        return nearestStation;
    };

    const selectNearestStation = (silent: boolean): void => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const nearestStation = getNearestStation(
                        position.coords.latitude,
                        position.coords.longitude,
                        config.stationName
                    );
                    if (nearestStation) {
                        favStationCallback(nearestStation);
                    }
                },
                () => {
                    if (!silent) {
                        alert(t.locationError);
                    }
                }
            );
        }
    };

    const requestLocation = (): void => {
        // Clear search input before getting location
        window.dispatchEvent(new Event('clearStationSearch'));
        // Reset so that if the same station is found again, the state change
        // (null → station) still triggers the useEffect and re-selects it.
        setCurrentStation(null);
        setSelectedStation("unselected");
        selectNearestStation(false);
    };

    // Auto-select nearest station on app launch; fail silently if denied
    useEffect(() => {
        selectNearestStation(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentStation) {
            setSelectedStation(currentStation);
        }
    }, [currentStation]);

    return (
        <Box className={classes.footer}>
            <VStack gap={4}>
                <HStack gap={4}>
                    <StationMenu callback={stationMenuCallback} selected={selectedStation} />
                    <IconButton onClick={requestLocation} aria-label="Get location" variant="subtle">
                        <LocateFixed size={20} />
                    </IconButton>
                </HStack>
            </VStack>
            <br/>
            <FavStations currentStation={currentStation} callback={favStationCallback} />
        </Box>
    );
};

export default Footer; 