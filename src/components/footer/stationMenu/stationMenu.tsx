import React, { useEffect, useState, useContext, useMemo, useCallback, useRef } from "react";
import classes from "./stationMenu.module.css";
import { Select, Input, InputGroup, InputLeftElement, InputRightElement, IconButton } from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import config from '../../../config';
import { LanguageContext } from "../../../context/LanguageContext";
import { StationMenuProps } from "../../../types";
import { translations } from "../../../translations/translations";

const StationMenu: React.FC<StationMenuProps> = ({ callback, selected }) => {
    const [selectedValue, setSelected] = useState<string>(selected);
    const [inputValue, setInputValue] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language || 'zh';

    const filteredStations = useMemo(() => {
        if (!searchTerm.trim()) return Object.keys(config.stationName);
        const term = searchTerm.toLowerCase();
        return Object.keys(config.stationName).filter(key => {
            const name = config.stationName[key].name.toLowerCase();
            return name.includes(term);
        });
    }, [searchTerm]);

    // Auto-select first filtered station if user hasn't manually selected
    useEffect(() => {
        if (searchTerm && !hasUserInteracted && filteredStations.length > 0) {
            const firstStation = filteredStations[0];
            if (selectedValue !== firstStation) {
                setSelected(firstStation);
                callback(firstStation);
            }
        }
    }, [searchTerm, filteredStations, hasUserInteracted, selectedValue, callback]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const newValue = e.currentTarget.value;
        setSelected(newValue);
        setHasUserInteracted(true);
        if (newValue !== "unselected") {
            callback(newValue);
        }
    };

    const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setInputValue(value);
        setHasUserInteracted(false);

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            setSearchTerm(value);
        }, 300);
    }, []);

    useEffect(() => {
        setSelected(selected);
    }, [selected]);

    return (
        <div className={classes.select}>
            <InputGroup mb={2}>
                <InputLeftElement height="100%" pointerEvents='none' width='40px'>
                    <SearchIcon color='gray.500' boxSize={3} />
                </InputLeftElement>
                <Input
                    placeholder={translations[language].searchStation}
                    value={inputValue}
                    onChange={onSearchChange}
                    size="sm"
                    borderRadius="md"
                    pl="40px"
                    pr="40px"
                    fontSize="16px"
                    _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
                />
                <InputRightElement height="100%" width='40px'>
                    <IconButton
                        aria-label="Clear search"
                        icon={<CloseIcon color='gray.500' boxSize={3} />}
                        variant="ghost"
                        size="sm"
                        visibility={inputValue ? "visible" : "hidden"}
                        _hover={{ color: 'gray.600' }}
                        onClick={() => {
                            setInputValue("");
                            setSearchTerm("");
                            setHasUserInteracted(false);
                        }}
                    />
                </InputRightElement>
            </InputGroup>
            <Select
                onChange={onChangeHandler}
                value={selectedValue}
                borderRadius="md"
                size="sm"
            >
                <option key="unselected" value="unselected" disabled>
                    {translations[language].pleaseSelect}
                </option>
                {filteredStations.map(station => {
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
