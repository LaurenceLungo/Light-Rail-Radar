import { useState, useEffect } from "react";
import classes from "./homePage.module.css";
import StationMenu from "../stationMenu/stationMenu";
import PlatformCard from "../platformCard/platformCard";
import config from "../../config";

function HomePage() {
    const [isLoading, setIsLoading] = useState(true);
    const [station, setStation] = useState(1);
    const [eta, setEta] = useState([]);

    useEffect(() => {
        fetch(
            `${config.etaURL}?station_id=${station}`
        ).then(res => {
            return res.json();
        }).then(data => {
            setEta(data);
            setIsLoading(false);
        });
    }, [station]);

    function selectHandler(e) {
        console.log('aaa:', e.currentTarget.value)
        setStation(e.currentTarget.value);
    }

    if (isLoading) {
        return (
            <section>
                <p>loading...</p>
            </section>
        )
    }

    return (
        <div>
            {eta.system_time}
            <br />
            <StationMenu callback={selectHandler}/>
            <br />
            <br />
            {eta.platform_list.map((val) =>
                <PlatformCard key={val.platform_id} platform={val} />
            )}
        </div>
    )
}

export default HomePage;