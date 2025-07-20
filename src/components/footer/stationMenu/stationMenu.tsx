import React, { useEffect, useState, useContext } from "react";
import classes from "./stationMenu.module.css";
import { Select } from "@chakra-ui/react";
import config from '../../../config';
import { LanguageContext } from "../../../context/LanguageContext";
import { StationMenuProps } from "../../../types";
import { translations } from "../../../translations/translations";

const StationMenu: React.FC<StationMenuProps> = ({ callback, selected }) => {
    const [selectedValue, setSelected] = useState<string>(selected);
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language || 'zh';

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelected(e.currentTarget.value);
        callback(e);
    };

    useEffect(() => {
        setSelected(selected);
    }, [selected]);

    return (
        <div className={classes.select}>
            <Select onChange={onChangeHandler} value={selectedValue}>
                <option key="unselected" value="unselected" disabled>
                    {translations[language].pleaseSelect}
                </option>
                {Object.keys(config.stationName).map(station => {
                    return (
                        <option key={station} value={station}>
                            {config.stationName[station]['name']}
                        </option>
                    );
                })}
            </Select>
        </div>
    );
};

export default StationMenu; 