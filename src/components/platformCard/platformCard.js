import { Fragment } from "react";
import classes from "./platformCard.module.css";
import RouteEntry from "../routeEntry/routeEntry";

function PlatformCard(props) {
    const platform = props.platform;
    const route_list = platform.route_list;
    const platform_id = platform.platform_id;

    if (!route_list) {
        return (
            <Fragment>
            <div className={classes.platform}>{platform_id}號月台</div>
            <table className={classes.table}>
                <div className={classes.endOfServiceNotice}>
                    -尾班車已過-
                </div>
            </table>
        </Fragment>
        )
    }
    return (
        <Fragment>
            <div className={classes.platform}>{platform_id}號月台</div>
            <table className={classes.table}>
                <tbody>
                    {route_list.map((route, idx) => {
                        return (
                            <tr key={idx} className={classes.tr}>
                                <RouteEntry route={route} />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </Fragment>
    )
}

export default PlatformCard;