import classes from "./platformCard.module.css";
import RouteEntry from "../routeEntry/routeEntry";
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
} from '@chakra-ui/react'

function PlatformCard(props) {
  const platform = props.platform;
  const route_list = platform.route_list;
  const platform_id = platform.platform_id;

  if (!route_list) {
    return (
      <TableContainer>
        <Table variant='simple' size='sm'>
          <TableCaption placement='top'>{platform_id}號月台</TableCaption>
          <Tbody>
            <Tr>
              <Td>
                <Text className={classes.endOfServiceNotice} >-尾班車已過-</Text>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    )
  }
  return (
    <TableContainer>
      <Table variant='simple' size='sm'>
        <TableCaption placement='top'>{platform_id}號月台</TableCaption>
        <Thead>
          <Tr>
            <Th>路線</Th>
            <Th>方向</Th>
            <Th>到達時間</Th>
            <Th>車卡數</Th>
          </Tr>
        </Thead>
        <Tbody>
          {route_list.map((route, idx) => {
            return (
              <RouteEntry route={route} />
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default PlatformCard;