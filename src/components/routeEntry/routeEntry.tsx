import React, { useContext } from "react";
import { Table } from '@chakra-ui/react';
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
        <Table.Row>
            <Table.Cell>{route.route_no}</Table.Cell>
            <Table.Cell>{language === 'zh' ? route.dest_ch : route.dest_en}</Table.Cell>
            <Table.Cell>{isStopped ? t.lineStopped : (language === 'zh' ? route.time_ch : route.time_en)}</Table.Cell>
            <Table.Cell>{route.train_length}</Table.Cell>
        </Table.Row>
    );
};

export default RouteEntry; 