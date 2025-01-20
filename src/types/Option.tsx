export interface Option {
    ticker: string;
    expiration: Date;
    strike: number;
    contract: 'call' | 'put';
    volatility: number;
    currentPremium: number;
}