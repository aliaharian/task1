// export interface TickerData {
//   a: [string, string, string]; // Ask array (price, whole lot volume, lot volume)
//   b: [string, string, string]; // Bid array
//   c: [string, string];         // Last trade closed array (price, lot volume)
//   v: [string, string];         // Volume array (today, last 24 hours)
//   p: [string, string];         // Volume weighted average price array (today, last 24 hours)
//   t: [number, number];         // Number of trades array (today, last 24 hours)
//   l: [string, string];         // Low price array (today, last 24 hours)
//   h: [string, string];         // High price array (today, last 24 hours)
//   o: string;                   // Today's opening price
// }

export interface TickerData {
  "symbol": string,
  "bid": number,
  "bid_qty": number,
  "ask": number,
  "ask_qty": number,
  "last": number,
  "volume": number,
  "vwap": number,
  "low": number,
  "high": number,
  "change": number,
  "change_pct": number
}

export interface SubscriptionMessage {
  method: 'subscribe';
  "params": {
    "channel": string,
    "symbol": string[]
  }
}

export interface WebSocketMessage {
  channel: string;
  type: string;
  data: TickerData[];
}
