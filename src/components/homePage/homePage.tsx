import React, { useState, useEffect, useContext, useRef } from "react";
import Footer from "../footer/footer";
import PlatformCard from "../platformCard/platformCard";
import config from "../../config";
import { Container, Text, Box } from "@chakra-ui/react";
import { LanguageContext } from "../../context/LanguageContext";

function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef(callback);
    useEffect(() => { savedCallback.current = callback; }, [callback]);
    useEffect(() => {
        const id = setInterval(() => savedCallback.current(), delay);
        return () => clearInterval(id);
    }, [delay]);
}
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
        if (selectedStation === "unselected") {
            setPlatformList([]);
            setLastUpdatedTime("-");
            return;
        }
        const query = `${config.etaURL}?station_id=${selectedStation}`;
        
        try {
            const response = await fetch(query);
            const data: ETAResponse = await response.json();
            if (Array.isArray(data.platform_list)) {
                setPlatformList(data.platform_list);
            } else {
                setPlatformList([]);
            }
            // Extract time portion from system_time
            const timeOnly = data.system_time?.split(' ')[1] ?? "-";
            setLastUpdatedTime(timeOnly);
        } catch (error) {
            console.error('Error fetching ETA data:', error);
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
            <br />
            {platformList.map((val) =>
                <Box key={val.platform_id} mb={6}>
                    <PlatformCard platform={val} />
                </Box>
            )}
            {station !== "unselected" && (
                <Container>
                    <Text fontSize='sm'>
                        {t.updateTime}: {lastUpdatedTime} ({t.autoUpdateMessage(config.refreshInterval / 1000)})
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