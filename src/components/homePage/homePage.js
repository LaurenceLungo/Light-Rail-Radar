import { useState, useEffect, useContext } from "react";
import classes from "./homePage.module.css";
import Footer from "../footer/footer";
import PlatformCard from "../platformCard/platformCard";
import config from "../../config";
import { useInterval, Container, Text } from "@chakra-ui/react";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";

function HomePage() {
    const [station, setStation] = useState("unselected");
    const [platformList, setPlatformList] = useState([]);
    const [lastUpdatedTime, setLastUpdatedTime] = useState("-");
    const { language } = useContext(LanguageContext);
    const t = translations[language];

    function tryFetchingEta(selectedStation) {
        if (selectedStation !== "unselected") {
            const query = process.env.REACT_APP_CORS_PROXY_API ? `${process.env.REACT_APP_CORS_PROXY_API}/${config.etaURL}?station_id=${selectedStation}` : `${config.etaURL}?station_id=${selectedStation}`;
            fetch(query).then(res => {
                return res.json();
            }).then(data => {
                setPlatformList(data.platform_list);
                // Extract time portion from system_time
                const timeOnly = data.system_time.split(' ')[1];
                setLastUpdatedTime(timeOnly);
            });
        }
    }

    useEffect(() => {
        tryFetchingEta(station);
    }, [station]);

    useInterval(() => {
        tryFetchingEta(station);
    }, config.refreshInterval);

    function selectHandler(station) {
        setStation(station);
    }

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
                        {t.updateTime}: {lastUpdatedTime} ({t.autoUpdateMessage(config.refreshIntervalSec)})
                    </Text>
                </Container>
            )}
            <br />
            <br />
            <Footer callback={selectHandler} />
        </div>
    )
}

export default HomePage;