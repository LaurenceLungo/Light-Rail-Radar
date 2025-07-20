import classes from "./favStations.module.css";
import { Center, VStack, HStack, Button } from "@chakra-ui/react";
import config from "../../../config";
import { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";
import { translations } from "../../../translations/translations";

function FavStations(props) {
    const { language } = useContext(LanguageContext);
    const t = translations[language];

    let iniValFavorites = [];

    if (localStorage.getItem('favorites') !== null) {
        iniValFavorites = JSON.parse(localStorage.getItem('favorites'));
    }
    const [favorites, setFavorites] = useState(iniValFavorites);

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('triggered localStorage update:', localStorage.getItem('favorites'))
    }, [favorites]);

    function addToFavHandler() {
        if (!favorites.includes(props.currentStation) && props.currentStation !== null)
            setFavorites(favorites => [...favorites, props.currentStation]);
    }

    function delFromFavHandler() {
        if (favorites.includes(props.currentStation) && props.currentStation !== null)
            setFavorites(favorites => favorites.filter(value => {
                return value !== props.currentStation;
            }));
    }

    function onClickFavHandler(station) {
        props.callback(station);
    }

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
                        </Button>
                    })}
                </div>
            </VStack>
        </Center>
    )
}

export default FavStations;