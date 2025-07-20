import React, { useState, useEffect } from "react";
import classes from "./footer.module.css";
import { Circle, Box, IconButton, HStack, VStack } from "@chakra-ui/react";
import StationMenu from "./stationMenu/stationMenu";
import FavStations from "./favStations/favStations";
import config from "../../config";
import { AtSignIcon } from "@chakra-ui/icons";
import { FooterProps, Station } from "../../types";

const Footer: React.FC<FooterProps> = ({ callback }) => {
    const [currentStation, setCurrentStation] = useState<string | null>(null);
    const [selectedStation, setSelectedStation] = useState<string>("unselected");
    const [, setError] = useState<string | null>(null);

    const stationMenuCallback = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const station = e.currentTarget.value;
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
                    <IconButton onClick={requestLocation} icon={<AtSignIcon />} aria-label="Get location" />
                </HStack>
            </VStack>
            <br/>
            <FavStations currentStation={currentStation} callback={favStationCallback} />
        </Box>
    );
};

export default Footer; 