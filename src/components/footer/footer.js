import classes from "./footer.module.css";
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
        <div className={classes.footer}>
            <StationMenu callback={callback} selected={props.selected} />
            <FavStations currentStation={currentStation} callback={props.callback} />
        </div>
    )
}

export default Footer;