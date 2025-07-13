import classes from "./stationMenu.module.css";
import { Select } from "@chakra-ui/react"
import config from '../../../config';
import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../../../context/LanguageContext";

function StationMenu(props) {
    const [selected, setSelected] = useState(props.selected);
    const { language } = useContext(LanguageContext);

    function onChangeHandler(e) {
        setSelected(e.currentTarget.value);
        props.callback(e);
    }

    useEffect(() => {
        setSelected(props.selected)
    }, [props.selected]);

    return (
        <div className={classes.select}>
            <Select onChange={onChangeHandler} value={selected}>
                <option key="unselected" value="unselected" disabled>
                    {language === 'zh' ? '請選擇' : 'Please Select'}
                </option>
                {Object.keys(config.stationName).map(station => {
                    return (
                        <option key={station} value={station}>
                            {config.stationName[station]['name']}
                        </option>
                    )
                })}
            </Select>
        </div>
    )
}

export default StationMenu;