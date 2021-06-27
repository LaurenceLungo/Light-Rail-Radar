import classes from "./footer.module.css";
import StationMenu from "./stationMenu/stationMenu";
import FavStations from "./favStations/favStations";
import { Fragment, useState } from "react";

function Footer(props) {

    const [currentStation, setCurrentStation] = useState(null);

    function callback(e) {
        setCurrentStation(e.currentTarget.value);
        props.callback(e.currentTarget.value);
    }

    return (
        <Fragment>
            <StationMenu callback={callback} selected={props.selected} />
            <FavStations currentStation={currentStation} callback={props.callback} />
        </Fragment>
    )
}

export default Footer;