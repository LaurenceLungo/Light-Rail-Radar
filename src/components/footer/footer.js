import classes from "./footer.module.css";
import { Circle, Box } from "@chakra-ui/react"
import StationMenu from "./stationMenu/stationMenu";
import FavStations from "./favStations/favStations";
import { useState } from "react";

function Footer(props) {

    const [currentStation, setCurrentStation] = useState(null);
    const [selectedStation, setSelectedStation] = useState("unselected");

    function stationMenuCallback(e) {
        setCurrentStation(e.currentTarget.value);
        props.callback(e.currentTarget.value);
    }

    function favStationCallback(station) {
        setSelectedStation(station);
        props.callback(station);
    }

    return (
        <Box className={classes.footer}>
            <Circle>
                <StationMenu callback={stationMenuCallback} selected={selectedStation} />
            </Circle>
            <FavStations currentStation={currentStation} callback={favStationCallback} />
        </Box>
    )
}

export default Footer;