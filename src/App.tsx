// src/App.tsx

import React from 'react';
import styled from 'styled-components';
import PriceTable from './components/PriceTable';
import { useKrakenWebSocket } from './hooks/useKrakenWebSocket';

// Define the interface for the Status component's props
interface StatusProps {
  status: string;
}


const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h1`
  text-align: center;
`;

// Update the styled component to accept the StatusProps
const Status = styled.p<StatusProps>`
  text-align: center;
  color: ${(props) => (props.status === 'Open' ? 'green' : 'red')};
`;

const App: React.FC = () => {
  const { tickerData, connectionStatus } = useKrakenWebSocket();

  return (
    <Container>
      <Header>Real-Time Cryptocurrency Prices</Header>
      <Status status={connectionStatus}>
        WebSocket Status: {connectionStatus}
      </Status>
      <PriceTable tickerData={tickerData} />
    </Container>
  );
};

export default App;
