// Interface definitions
interface BlackScholesInputs {
    S: number;    // Current stock/asset price
    K: number;    // Strike price
    t: number;    // Time to maturity (in years)
    r: number;    // Risk-free interest rate (as decimal)
    sigma: number; // Volatility (as decimal)
}

interface BlackScholesOutput {
    call: number;
    put: number;
    parameters: {
        d1: number;
        d2: number;
        N_d1: number;
        N_d2: number;
    };
}

interface D1D2Result {
    d1: number;
    d2: number;
}

interface Greeks {
    delta: {
        call: number;
        put: number;
    };
    gamma: number;
    vega: number;
    theta: {
        call: number;
        put: number;
    };
    rho: {
        call: number;
        put: number;
    };
}

export{
    type BlackScholesInputs,
    type BlackScholesOutput,
    type D1D2Result,
    type Greeks,
}