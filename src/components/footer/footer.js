import classes from "./footer.module.css";
import { Circle, Box, IconButton, HStack, VStack } from "@chakra-ui/react";
import StationMenu from "./stationMenu/stationMenu";
import FavStations from "./favStations/favStations";
import { useState, useEffect } from "react";
import config from "../../config";
import { AtSignIcon } from "@chakra-ui/icons";

function Footer(props) {

    const [currentStation, setCurrentStation] = useState(null);
    const [selectedStation, setSelectedStation] = useState("unselected");
    const [error, setError] = useState(null);

    function stationMenuCallback(e) {
        setCurrentStation(e.currentTarget.value);
        props.callback(e.currentTarget.value);
    }

    function favStationCallback(station) {
        setCurrentStation(station);
        props.callback(station);
    }

    function getNearestStation(userLat, userLong, stations) {
        let nearestStation = null;
        let minDistance = Infinity;

        function haversine(lat1, lon1, lat2, lon2) {
            const toRad = (angle) => (angle * Math.PI) / 180;
            const R = 6371; // Earth's radius in km
            const dLat = toRad(lat2 - lat1);
            const dLon = toRad(lon2 - lon1);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c; // Distance in km
        }

        for (const stationKey in stations) {
            const { lat, long } = stations[stationKey];
            const distance = haversine(userLat, userLong, lat, long);

            if (distance < minDistance) {
                minDistance = distance;
                nearestStation = stationKey;
            }
        }

        return nearestStation;
    }

    function requestLocation() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const nearestStation = getNearestStation(
                        position.coords.latitude,
                        position.coords.longitude,
                        config.stationName
                    );
                    favStationCallback(nearestStation);
                },
                (err) => {
                    setError(err.message);
                    if (err.code === 1) {
                        alert("Location access is blocked. Enable it in: Settings > Safari > Location > Set to 'Ask' or 'Allow'");
                    }
                }
            );
        } else {
            setError("Geolocation not supported.");
        }
    }

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
                    <IconButton onClick={requestLocation} icon={<AtSignIcon />} />
                </HStack>
            </VStack>
            <FavStations currentStation={currentStation} callback={favStationCallback} />
        </Box>
    )
}

export default Footer;
