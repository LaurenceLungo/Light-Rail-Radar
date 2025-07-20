import React, { useState, useEffect, useContext } from "react";
import Footer from "../footer/footer";
import PlatformCard from "../platformCard/platformCard";
import config from "../../config";
import { useInterval, Container, Text } from "@chakra-ui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";
import { Platform, ETAResponse, HomePageProps } from "../../types";

const HomePage: React.FC<HomePageProps> = () => {
    const [station, setStation] = useState<string>("unselected");
    const [platformList, setPlatformList] = useState<Platform[]>([]);
    const [lastUpdatedTime, setLastUpdatedTime] = useState<string>("-");
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language || 'zh';
    const t = translations[language];

    const tryFetchingEta = async (selectedStation: string): Promise<void> => {
        if (selectedStation !== "unselected") {
            const query = `${config.etaURL}?station_id=${selectedStation}`;
            
            try {
                const response = await fetch(query);
                const data: ETAResponse = await response.json();
                setPlatformList(data.platform_list);
                // Extract time portion from system_time
                const timeOnly = data.system_time.split(' ')[1];
                setLastUpdatedTime(timeOnly);
            } catch (error) {
                console.error('Error fetching ETA data:', error);
            }
        }
    };

    useEffect(() => {
        tryFetchingEta(station);
    }, [station]);

    useInterval(() => {
        tryFetchingEta(station);
    }, config.refreshInterval);

    const selectHandler = (station: string): void => {
        setStation(station);
    };

    return (
        <div>
            <br />
            {platformList.map((val) =>
                <PlatformCard key={val.platform_id} platform={val} />
            )}
            <br />
            {station !== "unselected" && (
                <Container>
                    <Text fontSize='sm'>
                        {t.updateTime}: {lastUpdatedTime} ({t.autoUpdateMessage(parseInt(config.refreshIntervalSec))})
                    </Text>
                </Container>
            )}
            <br />
            <br />
            <Footer callback={selectHandler} />
        </div>
    );
};

export default HomePage; 