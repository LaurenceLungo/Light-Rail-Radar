import { useState, useEffect } from "react";
import classes from "./homePage.module.css";
import Footer from "../footer/footer";
import PlatformCard from "../platformCard/platformCard";
import config from "../../config";
import { useInterval, Container, Text } from "@chakra-ui/react";

function HomePage() {
    const [station, setStation] = useState("unselected");
    const [platformList, setPlatformList] = useState([]);
    const [lastUpdatedTime, setLastUpdatedTime] = useState("-");

    function tryFetchingEta(selectedStation) {
        if (selectedStation !== "unselected") {
            const query = process.env.REACT_APP_CORS_PROXY_API ? `${process.env.REACT_APP_CORS_PROXY_API}/${config.etaURL}?station_id=${selectedStation}` : `${config.etaURL}?station_id=${selectedStation}`;
            fetch(query).then(res => {
                return res.json();
            }).then(data => {
                setPlatformList(data.platform_list);
                setLastUpdatedTime(data.system_time);
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
        console.log('set', station)
        setStation(station);
    }

    return (
        <div>
            <br />
            {platformList.map((val) =>
                <PlatformCard key={val.platform_id} platform={val} />
            )}
            <br />
            <Container >
                <Text fontSize='sm'>
                    更新時間：{lastUpdatedTime} (每{config.refreshIntervalSec}秒自動更新)
                </Text>
            </Container>
            <br />
            <br />
            <Footer callback={selectHandler} />
        </div>
    )
}

export default HomePage;