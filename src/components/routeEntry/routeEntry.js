import classes from "./routeEntry.module.css";
import { Tr, Td } from '@chakra-ui/react'

function RouteEntry(props) {
    const route = props.route;
    return (
        <Tr>
            <Td>{route.route_no}</Td>
            <Td>{route.dest_ch}</Td>
            <Td>{route.time_ch}</Td>
            <Td>{route.train_length} 卡</Td>
        </Tr>
    )
}

export default RouteEntry;