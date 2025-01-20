import {D1D2Result, BlackScholesOutput, Greeks} from './BlackScholesTypes'

/**
 * Black-Scholes Option Pricing Model Calculator
 * TypeScript Implementation
 */

// Standard normal cumulative distribution function (CDF)
function normalCDF(x: number): number {
    const a1: number = 0.254829592;
    const a2: number = -0.284496736;
    const a3: number = 1.421413741;
    const a4: number = -1.453152027;
    const a5: number = 1.061405429;
    const p: number = 0.3275911;

    const sign: number = (x < 0) ? -1 : 1;
    x = Math.abs(x) / Math.sqrt(2.0);

    const t: number = 1.0 / (1.0 + p * x);
    const y: number = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return 0.5 * (1.0 + sign * y);
}

// Calculate d1 and d2 parameters
function calculateD1D2(S: number, K: number, t: number, r: number, sigma: number): D1D2Result {
    const d1: number = (Math.log(S / K) + (r + sigma * sigma / 2) * t) / (sigma * Math.sqrt(t));
    const d2: number = d1 - sigma * Math.sqrt(t);
    return { d1, d2 };
}

/**
 * Main Black-Scholes calculation function
 * Returns both call and put option prices
 */
function blackScholes(
    S: number,
    K: number,
    t: number,
    r: number,
    sigma: number
): BlackScholesOutput {
    // Input validation
    if (S <= 0 || K <= 0 || t <= 0 || sigma <= 0) {
        throw new Error('Invalid input: All parameters must be positive numbers');
    }

    // Calculate d1 and d2
    const { d1, d2 }: D1D2Result = calculateD1D2(S, K, t, r, sigma);

    // Calculate call option price
    const callPrice: number = S * normalCDF(d1) - K * Math.exp(-r * t) * normalCDF(d2);

    // Calculate put option price using put-call parity
    const putPrice: number = callPrice - S + K * Math.exp(-r * t);

    return {
        call: callPrice,
        put: putPrice,
        parameters: {
            d1: d1,
            d2: d2,
            N_d1: normalCDF(d1),
            N_d2: normalCDF(d2)
        }
    };
}

/**
 * Calculate option Greeks (sensitivity measures)
 */
function calculateGreeks(
    S: number,
    K: number,
    t: number,
    r: number,
    sigma: number
): Greeks {
    const { d1, d2 }: D1D2Result = calculateD1D2(S, K, t, r, sigma);
    
    // Standard normal PDF
    const standardNormalPDF = (x: number): number => 
        Math.exp(-Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);

    // Calculate Greeks
    const delta_call: number = normalCDF(d1);
    const delta_put: number = delta_call - 1;
    
    const gamma: number = standardNormalPDF(d1) / (S * sigma * Math.sqrt(t));
    
    const vega: number = S * Math.sqrt(t) * standardNormalPDF(d1);
    
    const theta_call: number = -(S * sigma * standardNormalPDF(d1)) / (2 * Math.sqrt(t)) 
                              - r * K * Math.exp(-r * t) * normalCDF(d2);
    const theta_put: number = theta_call + r * K * Math.exp(-r * t);
    
    const rho_call: number = K * t * Math.exp(-r * t) * normalCDF(d2);
    const rho_put: number = -K * t * Math.exp(-r * t) * normalCDF(-d2);

    return {
        delta: { call: delta_call, put: delta_put },
        gamma: gamma,
        vega: vega,
        theta: { call: theta_call, put: theta_put },
        rho: { call: rho_call, put: rho_put }
    };
}

// Example usage:
/*
const optionPrice: BlackScholesOutput = blackScholes(
    100,    // Current stock price
    100,    // Strike price
    1,      // Time to maturity (1 year)
    0.05,   // Risk-free rate (5%)
    0.2     // Volatility (20%)
);

const greeks: Greeks = calculateGreeks(
    100,    // Current stock price
    100,    // Strike price
    1,      // Time to maturity (1 year)
    0.05,   // Risk-free rate (5%)
    0.2     // Volatility (20%)
);

console.log('Option Prices:', optionPrice);
console.log('Greeks:', greeks);
*/

// Export functions and types

console.log(blackScholes(
    37.43,    // Current stock price
    28.5,    // Strike price
    0.00821917808219178,      // Time to maturity (1 year)
    0.0429,   // Risk-free rate (5%)
    0.9667     // Volatility (20%)
));

export {
    blackScholes,
    calculateGreeks
};