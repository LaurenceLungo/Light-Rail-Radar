import React, { useContext } from "react";
import classes from "./platformCard.module.css";
import RouteEntry from "../routeEntry/routeEntry";
import { LanguageContext } from "../../context/LanguageContext";
import { ExpandedContext } from "../../context/ExpandedContext";
import { translations } from "../../translations/translations";
import { Table, Text } from '@chakra-ui/react';
import { PlatformCardProps } from "../../types";
import config from "../../config";

const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const route_list = platform.route_list;
  const platform_id = platform.platform_id;
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || 'zh';
  const t = translations[language];
  const expandedContext = useContext(ExpandedContext);
  const expanded = expandedContext?.expanded ?? false;

  if (!route_list) {
    return (
      <Table.Root size='sm'>
        <Table.Caption captionSide='top'>{t.platform(platform_id)}</Table.Caption>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Text className={classes.endOfServiceNotice}>
                {t.endOfService}
              </Text>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    );
  }
  
  return (
  <Table.Root size='sm'>
      <Table.Caption fontSize="xs" fontWeight="bold" captionSide='top'>{t.platform(platform_id)}</Table.Caption>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader fontSize="xs" fontWeight="bold" color='fg.muted'>{t.route}</Table.ColumnHeader>
          <Table.ColumnHeader fontSize="xs" fontWeight="bold" color='fg.muted'>{t.direction}</Table.ColumnHeader>
          <Table.ColumnHeader fontSize="xs" fontWeight="bold" color='fg.muted'>{t.arrivalTime}</Table.ColumnHeader>
          <Table.ColumnHeader fontSize="xs" fontWeight="bold" color='fg.muted'>{t.cars}</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {(expanded ? route_list : route_list.slice(0, config.maxRows)).map((route, idx) => (
          <RouteEntry key={idx} route={route} />
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default PlatformCard; 