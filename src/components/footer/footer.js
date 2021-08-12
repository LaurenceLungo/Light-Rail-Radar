import classes from "./footer.module.css";
import { Circle, Box } from "@chakra-ui/react"
import StationMenu from "./stationMenu/stationMenu";
import FavStations from "./favStations/favStations";
import { useState } from "react";

function Footer(props) {

    const [currentStation, setCurrentStation] = useState(null);

    function callback(e) {
        setCurrentStation(e.currentTarget.value);
        props.callback(e.currentTarget.value);
    }

    return (
        <Box className={classes.footer}>
            <Circle>
                <StationMenu callback={callback} selected={props.selected} />
            </Circle>
            <FavStations currentStation={currentStation} callback={props.callback} />
        </Box>
    )
}

export default Footer;