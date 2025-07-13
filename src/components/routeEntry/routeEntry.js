import classes from "./routeEntry.module.css";
import { Tr, Td } from '@chakra-ui/react';
import { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";

function RouteEntry(props) {
    const route = props.route;
    const { language } = useContext(LanguageContext);
    const t = translations[language];

    return (
        <Tr>
            <Td>{route.route_no}</Td>
            <Td>{language === 'zh' ? route.dest_ch : route.dest_en}</Td>
            <Td>{language === 'zh' ? route.time_ch : route.time_en}</Td>
            <Td>{route.train_length}</Td>
        </Tr>
    )
}

export default RouteEntry;