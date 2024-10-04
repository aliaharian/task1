import styled, { keyframes } from "styled-components";
import { TickerData } from "../types/types";

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const flashGreen = keyframes`
  0% {
    background-color: green;
  }
  100% {
    background-color: transparent;
  }
`;

const Tr = styled.tr`
  animation: ${flashGreen} 1s ease-in-out;
`;

export const PriceRow = ({ pair, data }: { pair: string, data: TickerData }) => {
    return (
        <Tr key={pair}>
            <Td>{pair}</Td>
            <Td>${data.last}</Td>
            <Td>${data.bid}</Td>
            <Td>${data.ask}</Td>
            <Td>{data.volume}</Td>
            <Td>{data.change}</Td>
        </Tr>
    )
}