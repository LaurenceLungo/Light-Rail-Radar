import classes from "./favStations.module.css";
import config from "../../../config";
import { Fragment, useState, useEffect } from "react";

function FavStations(props) {
    let iniValFavorites = [];
    if (localStorage.getItem('favorites') !== null) {
        iniValFavorites = JSON.parse(localStorage.getItem('favorites'));
    }
    const [favorites, setFavorites] = useState(iniValFavorites);
    
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('triggered localStorage update:', localStorage.getItem('favorites'))
    }, [favorites]);

    function addToFavHandler() {
        if (!favorites.includes(props.currentStation) && props.currentStation !== null)
            setFavorites(favorites => [...favorites, props.currentStation]);
    }

    function delFromFavHandler() {
        if (favorites.includes(props.currentStation) && props.currentStation !== null)
            setFavorites(favorites => favorites.filter(value => {
                return value !== props.currentStation;
            }));
    }

    function onClickFavHandler(station) {
        props.callback(station);
    }

    return (
        <Fragment>
            <button onClick={addToFavHandler} className={`${classes.btn} ${classes.add}`}>加至書籤</button>
            <button onClick={delFromFavHandler} className={`${classes.btn} ${classes.del}`}>從書籤刪除</button>
            <div>
                {favorites.map((station) => {
                    return <button key={station} value={station} className={classes.btn} onClick={() => onClickFavHandler(station)}>
                        {config.stationName[station]["name"]}
                    </button>
                })}
            </div>
        </Fragment>
    )
}

export default FavStations;