import React, { useContext } from "react";
import classes from "./platformCard.module.css";
import RouteEntry from "../routeEntry/routeEntry";
import { LanguageContext } from "../../context/LanguageContext";
import { translations } from "../../translations/translations";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { PlatformCardProps } from "../../types";

const PlatformCard: React.FC<PlatformCardProps> = ({ platform }) => {
  const route_list = platform.route_list;
  const platform_id = platform.platform_id;
  const languageContext = useContext(LanguageContext);
  const language = languageContext?.language || 'zh';
  const t = translations[language];

  if (!route_list) {
    return (
      <TableContainer>
        <Table variant='simple' size='sm'>
          <TableCaption placement='top'>{t.platform(platform_id)}</TableCaption>
          <Tbody>
            <Tr>
              <Td>
                <Text className={classes.endOfServiceNotice}>
                  {t.endOfService}
                </Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    );
  }
  
  return (
    <TableContainer>
      <Table variant='simple' size='sm'>
        <TableCaption placement='top'>{t.platform(platform_id)}</TableCaption>
        <Thead>
          <Tr>
            <Th>{t.route}</Th>
            <Th>{t.direction}</Th>
            <Th>{t.arrivalTime}</Th>
            <Th>{t.cars}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {route_list.map((route, idx) => (
            <RouteEntry key={idx} route={route} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PlatformCard; 