import React, { useState, useEffect, useContext } from "react";
import classes from "./favStations.module.css";
import { Center, VStack, HStack, Button } from "@chakra-ui/react";
import config from "../../../config";
import { LanguageContext } from "../../../context/LanguageContext";
import { translations } from "../../../translations/translations";
import { FavStationsProps } from "../../../types";

const FavStations: React.FC<FavStationsProps> = ({ currentStation, callback }) => {
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language || 'zh';
    const t = translations[language];

    let iniValFavorites: string[] = [];

    if (localStorage.getItem('favorites') !== null) {
        iniValFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    }
    const [favorites, setFavorites] = useState<string[]>(iniValFavorites);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    const addToFavHandler = (): void => {
        if (!favorites.includes(currentStation || '') && currentStation !== null) {
            setFavorites(favorites => [...favorites, currentStation!]);
        }
    };

    const delFromFavHandler = (): void => {
        if (favorites.includes(currentStation || '') && currentStation !== null) {
            setFavorites(favorites => favorites.filter(value => {
                return value !== currentStation;
            }));
        }
    };

    const onClickFavHandler = (station: string): void => {
        // ensure the search bar is cleared before changing the station
        window.dispatchEvent(new Event('clearStationSearch'));
        callback(station);
    };

    return (
        <Center>
            <VStack spacing={4}>
                <HStack spacing={4}>
                    <Button variant="outline" colorScheme="blue" onClick={addToFavHandler} >
                        {t.addToBookmark}
                    </Button>
                    <Button variant="outline" colorScheme="red" onClick={delFromFavHandler} >
                        {t.removeFromBookmark}
                    </Button>
                </HStack>
                <div>
                    {favorites.map((station) => {
                        return <Button key={station} value={station} className={classes.btn} onClick={() => onClickFavHandler(station)}>
                            {config.stationName[station]["name"]}
                        </Button>;
                    })}
                </div>
            </VStack>
        </Center>
    );
};

export default FavStations; 