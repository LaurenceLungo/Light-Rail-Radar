import { Fragment } from "react";
import classes from "./routeEntry.module.css";

function RouteEntry(props) {
    const route = props.route;
    return (
        <Fragment>
            <td>{route.route_no}</td>
            <td>{route.dest_ch}</td>
            <td>{route.time_ch}</td>
        </Fragment>
    )
}

export default RouteEntry;