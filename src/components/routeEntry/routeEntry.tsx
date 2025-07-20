import React, { useContext } from "react";
import { Tr, Td } from '@chakra-ui/react';
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";
import { RouteEntryProps } from "../../types";

const RouteEntry: React.FC<RouteEntryProps> = ({ route }) => {
    const languageContext = useContext(LanguageContext);
    const language = languageContext?.language || 'zh';
    const t = translations[language];

    // Check if the route is stopped due to typhoon
    const isStopped = route.stop === 1;

    return (
        <Tr>
            <Td>{route.route_no}</Td>
            <Td>{language === 'zh' ? route.dest_ch : route.dest_en}</Td>
            <Td>{isStopped ? t.lineStopped : (language === 'zh' ? route.time_ch : route.time_en)}</Td>
            <Td>{route.train_length}</Td>
        </Tr>
    );
};

export default RouteEntry; 