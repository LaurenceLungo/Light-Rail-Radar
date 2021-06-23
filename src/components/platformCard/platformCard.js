import { Fragment } from "react";
import classes from "./platformCard.module.css";
import RouteEntry from "../routeEntry/routeEntry";

function PlatformCard(props) {
    const platform = props.platform;
    const route_list = platform.route_list;
    const platform_id = platform.platform_id;
    return (
        <Fragment>
            <div>{platform_id}號月台</div>
            <table>
                <tbody>
                    {route_list.map((route, idx) => {
                        return (
                            <tr key={idx}>
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