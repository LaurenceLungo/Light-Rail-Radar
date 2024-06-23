import classes from "./favStations.module.css";
import { Center, VStack, HStack, Button, IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon } from '@chakra-ui/icons';
import config from "../../../config";
import { useState, useEffect } from "react";

function FavStations(props) {
    let iniValFavorites = [];
    const { colorMode, toggleColorMode } = useColorMode();

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
                    <Button variant="outline" colorScheme="blue" onClick={addToFavHandler} >加至書籤</Button>
                    <Button variant="outline" colorScheme="red" onClick={delFromFavHandler} >從書籤刪除</Button>
                    <IconButton onClick={toggleColorMode} icon={<MoonIcon />}>
                        Toggle {colorMode === "light" ? "Dark" : "Light"}
                    </IconButton>
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