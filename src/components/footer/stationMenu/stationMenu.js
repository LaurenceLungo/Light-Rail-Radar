import classes from "./stationMenu.module.css";
import { Select } from "@chakra-ui/react"
import config from '../../../config';

function StationMenu(props) {
    return (
        <div className={classes.select}>
            <Select onChange={props.callback} defaultValue="unselected">
                <option key="unselected" value="unselected" disabled>- 請選擇 Please Select -</option>
                {Object.keys(config.stationName).map(station => {
                    return <option key={station} value={station}>{config.stationName[station]['name']}</option>
                })}
            </Select>
        </div>
    )
}

export default StationMenu;