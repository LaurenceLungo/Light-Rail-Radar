import classes from "./stationMenu.module.css";
import config from '../../config';

function StationMenu(props) {
    return (
        <select onChange={props.callback}>
            {Object.keys(config.stationName).map(station => {
                return <option key={station} value={station}>{config.stationName[station]['name']}</option>
            })}
        </select>
    )
}

export default StationMenu;