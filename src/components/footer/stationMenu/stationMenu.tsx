import React, { useEffect, useState, useContext } from "react";
import classes from "./stationMenu.module.css";
import { Combobox, Portal, useFilter, useListCollection } from "@chakra-ui/react";
import config from '../../../config';
import { LanguageContext } from "../../../context/LanguageContext";
import { StationMenuProps } from "../../../types";
import { translations } from "../../../translations/translations";

const StationMenu: React.FC<StationMenuProps> = ({ callback, selected }) => {
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language || 'zh';
    const t = translations[language];

    const stationItems = Object.keys(config.stationName).map(key => ({
        label: config.stationName[key]['name'],
        value: key,
    }));

    const { contains } = useFilter({ sensitivity: 'base' });
    const { collection, filter } = useListCollection({
        initialItems: stationItems,
        filter: contains,
    });

    const [value, setValue] = useState<string[]>(
        selected !== "unselected" ? [selected] : []
    );

    // Sync combobox selection with external prop changes (e.g. geolocation)
    useEffect(() => {
        if (selected && selected !== "unselected") {
            setValue([selected]);
        }
    }, [selected]);

    // Listen for clear events (e.g. location button pressed in Footer)
    useEffect(() => {
        const clearHandler = () => {
            filter("");
        };
        window.addEventListener('clearStationSearch', clearHandler);
        return () => window.removeEventListener('clearStationSearch', clearHandler);
    }, [filter]);

    return (
        <div className={classes.select}>
            <Combobox.Root
                collection={collection}
                onInputValueChange={(e) => filter(e.inputValue)}
                onValueChange={(e) => {
                    setValue(e.value);
                    if (e.value.length > 0) {
                        callback(e.value[0]);
                    } else {
                        callback("unselected");
                    }
                }}
                value={value}
                openOnClick
                inputBehavior="autohighlight"
                size="md"
            >
                <Combobox.Control>
                    <Combobox.Input placeholder={t.pleaseSelect} fontSize="16px" />
                    <Combobox.IndicatorGroup>
                        <Combobox.ClearTrigger />
                        <Combobox.Trigger />
                    </Combobox.IndicatorGroup>
                </Combobox.Control>
                <Portal>
                    <Combobox.Positioner>
                        <Combobox.Content>
                            <Combobox.Empty>{t.searchStation}</Combobox.Empty>
                            {collection.items.map((item) => (
                                <Combobox.Item item={item} key={item.value}>
                                    {item.label}
                                    <Combobox.ItemIndicator />
                                </Combobox.Item>
                            ))}
                        </Combobox.Content>
                    </Combobox.Positioner>
                </Portal>
            </Combobox.Root>
        </div>
    );
};

export default StationMenu;
