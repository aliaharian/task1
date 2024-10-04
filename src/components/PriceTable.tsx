// src/components/PriceTable.tsx

import React, { useMemo } from 'react';
import styled from 'styled-components';
import { TickerData } from '../types/types';
import { PriceRow } from './PriceRow';

interface PriceTableProps {
    tickerData: { [key: string]: TickerData };
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f4f4f4;
`;



const PriceTable: React.FC<PriceTableProps> = ({ tickerData }) => {
    const rows = useMemo(() =>
        Object.keys(tickerData).map(pair => {
            const data = tickerData[pair];
            return (
                <PriceRow key={pair} data={data} pair={pair} />
            );
        }), [tickerData]
    );

    return (
        <Table>
            <thead>
                <tr>
                    <Th>Pair</Th>
                    <Th>Last Price</Th>
                    <Th>Bid</Th>
                    <Th>Ask</Th>
                    <Th>Volume</Th>
                    <Th>Change</Th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    );
};

export default PriceTable;
