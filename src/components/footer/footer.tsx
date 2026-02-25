import React, { useState, useEffect } from "react";
import classes from "./footer.module.css";
import { Circle, Box, IconButton, HStack, VStack, Icon } from "@chakra-ui/react";
import StationMenu from "./stationMenu/stationMenu";
import FavStations from "./favStations/favStations";
import config from "../../config";
import { FooterProps, Station } from "../../types";

// Custom Location Pin Icon (inverted teardrop with circle hole)
const TargetIcon = (props: any) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <defs>
      <mask id="hole">
        <rect width="24" height="24" fill="white"/>
        <circle cx="12" cy="9" r="2.5" fill="black"/>
      </mask>
    </defs>
    <path
      fill="currentColor"
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      mask="url(#hole)"
    />
  </Icon>
);

const Footer: React.FC<FooterProps> = ({ callback }) => {
    const [currentStation, setCurrentStation] = useState<string | null>(null);
    const [selectedStation, setSelectedStation] = useState<string>("unselected");
    const [, setError] = useState<string | null>(null);

    const stationMenuCallback = (station: string): void => {
        setCurrentStation(station);
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

    const requestLocation = (): void => {
        // Clear search input before getting location
        window.dispatchEvent(new Event('clearStationSearch'));

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
                (err) => {
                    setError(err.message);
                    if (err.code === 1) {
                        alert("無法存取你的定位，請到「設定」開啟定位及允許存取。");
                    }
                }
            );
        } else {
            setError("Geolocation not supported.");
        }
    };

    useEffect(() => {
        if (currentStation) {
            setSelectedStation(currentStation);
        }
    }, [currentStation]);

    return (
        <Box className={classes.footer}>
            <VStack spacing={4}>
                <HStack spacing={4}>
                    <Circle>
                        <StationMenu callback={stationMenuCallback} selected={selectedStation} />
                    </Circle>
                    <IconButton onClick={requestLocation} icon={<TargetIcon boxSize={5} />} aria-label="Get location" fontSize="1.75rem" />
                </HStack>
            </VStack>
            <br/>
            <FavStations currentStation={currentStation} callback={favStationCallback} />
        </Box>
    );
};

export default Footer; 