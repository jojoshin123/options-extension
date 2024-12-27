export interface Option {
    ticker: String;
    expiration: Date;
    strike: Number;
    contract: 'call' | 'put'
}