import { useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { TickerData, SubscriptionMessage, WebSocketMessage } from '../types/types';

const SOCKET_URL = 'wss://ws.kraken.com/v2';

const pairs = ['BTC/USD', 'ETH/USD', 'LTC/USD', 'XRP/USD', 'ADA/USD', 'DOT/USD'];

export const useKrakenWebSocket = () => {
    const [tickerData, setTickerData] = useState<{ [key: string]: TickerData }>({});

    const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<WebSocketMessage>(SOCKET_URL, {
        onOpen: () => {
            console.log('Connected to Kraken WebSocket');
            const msg: SubscriptionMessage = {
                method: 'subscribe',
                params: {
                    symbol: pairs,
                    channel: 'ticker'
                }
            };
            sendJsonMessage(msg);
        },
        onMessage: () => {
            if (lastJsonMessage) {
                const { channel, type, data } = lastJsonMessage;
                if (channel === "ticker" && (type === "snapshot" || type === "update")) {
                    setTickerData(prev => ({
                        ...prev,
                        [`${data[0].symbol}`]: data[0] as TickerData,
                    }));
                }
            }
        },
        shouldReconnect: (closeEvent) => {
            console.log(closeEvent);
            return true
        },
        reconnectAttempts: Infinity,
        reconnectInterval: 3000,
    });

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return { tickerData, connectionStatus };
};
