// Grid.tsx
import { useState, useEffect } from "react";
import "./Grid.scss";
import { divideDateInterval } from "../util/DateUtil";
import { ReactElement } from "react";
import { blackScholes } from "../util/BlackScholes";
import { Option } from "../types/Option";

interface GridProps {
  option: Option;
  currentPrice: number;
  lowPrice: number;
  highPrice: number
}

function generatePriceCell(
    rowIndex: number, 
    colIndex: number, 
    newPrice : number, 
    currPrice: number): ReactElement {

    let colorClass : number = Math.ceil((newPrice-currPrice)*40);

    if (colorClass > 40){
        colorClass = 40
    }else if (colorClass < -40){
        colorClass = -40
    }

    const color : string = "color-" + (colorClass > 0 ? "green-" : "red-") + Math.abs(colorClass);
    return (
        <div key={`cell-${rowIndex}-${colIndex}`} className={`grid-cell ${color}`}>
        {"$" + newPrice.toFixed(1)}
        </div>
    );
}

function generateMonthRow(dateArray : Date[]): ReactElement[][] {

    const CELL_WIDTH : number = 52;

    const monthArray : ReactElement[] = []
    const dayArray : ReactElement[] = []
    const justMonthArray = dateArray.map(d=>d.toDateString().slice(4,7));
    const justDaysArray = dateArray.map(d=>d.toDateString().slice(8,10));

    let currMonth : string = justMonthArray[0];
    let currWidth : number = 0;
    let colorClass : string = "grid-month-light";

    // For day column
    monthArray.push(
        <div key={`cell-month-init`} className={`grid-cell bold ${colorClass}`}/>
    );
    dayArray.push(
        <div key={`cell-day-init`} className={`grid-cell bold ${colorClass}`}/>
    );

    for (let i = 0; i<dateArray.length; i++){
        
        if (justMonthArray[i] === currMonth){
            currWidth+=1;
        }else{
            const temp : number = (CELL_WIDTH*currWidth)-2
            currWidth = currWidth == 0 ? 1 : currWidth
            monthArray.push(
                <div key={`cell-${currMonth}`} className={`grid-cell bold ${colorClass}`} style={{ width: `${temp}px` }}>
                    {currMonth}
                </div>
            );
            currMonth = justMonthArray[i];
            currWidth = 1;
            colorClass = colorClass === "grid-month-light" ? "grid-month-dark" : "grid-month-light";
        }

        dayArray.push(
            <div key={`cell-${justDaysArray[i]}`} className={`grid-cell bold ${colorClass}`}>
                {justDaysArray[i].toString()}
            </div>
        );

    }
    // Edge case
    const temp : number = (CELL_WIDTH*currWidth)-2
    monthArray.push(
        <div key={`cell-${currMonth}`} className={`grid-cell bold ${colorClass}`} style={{ width: `${temp}px` }}>
            {currMonth}
        </div>
    );

    return [monthArray, dayArray]
  }

  function generatePricedRow(
    price: number,
    option: Option,
    dateAxis: Date[]): number[] {

        let toReturn : number[] = [];
    
        for (let i = 0; i<dateAxis.length;i++){

            const dte = (option.expiration.valueOf() - dateAxis[i].valueOf())/86400000/365

            const val = dte === 0
            ? price-option.strike
            : parseFloat(blackScholes(
                price,    // Current stock price
                option.strike,    // Strike price
                dte,      // Time to maturity (1 year)
                0.0429,   // Risk-free rate (5%)
                option.volatility/100     // Volatility (20%)
            ).call.toFixed(1));

            toReturn.push(val);
            
        }
        return toReturn
  }


const Grid = ({ option, currentPrice, lowPrice, highPrice } : GridProps) => {

    const [grid, setGrid] = useState<number[][]>([])
    const priceRange : number[] = [];

    const dateAxis: Date[] = divideDateInterval(option.expiration)
    const gridWidth = dateAxis.length;
    const gridHeight = 20;

    // Months and days title rows
    const rows : ReactElement[][] = generateMonthRow(dateAxis);

    useEffect(() => {
        console.log('lowPrice or highPrice changed:', { lowPrice, highPrice });
        setGrid([]);
    }, [lowPrice, highPrice]);

    
    // Populate upper prices
    // First, determine how many cells we can allocate to the upper range
    const numOfUpperCells = Math.floor((currentPrice/highPrice)*gridHeight)
    let increment = Math.abs((highPrice - currentPrice)/numOfUpperCells)

    // Start populating rows top-down
    // Edge case
    grid.push(
        generatePricedRow(
            highPrice,
            option,
            dateAxis)
    );
    priceRange.push(highPrice);

    for (let i = numOfUpperCells-1; i>0;i--){
        console.log(currentPrice + (i*increment));
        grid.push(
            generatePricedRow(
                currentPrice + (i*increment),
                option,
                dateAxis)
        );
        priceRange.push(currentPrice + i*increment);
    }
    
    priceRange.push(currentPrice);

    // Populate lower prices
    const numOfLowerCells = gridHeight-numOfUpperCells
    increment = Math.abs((currentPrice - lowPrice)/numOfLowerCells)

    for (let i = 1; i<numOfLowerCells;i++){
        console.log(currentPrice - (i*increment));
        grid.push(
            generatePricedRow(
                currentPrice - (i*increment),
                option,
                dateAxis)
        );
        priceRange.push(currentPrice - i*increment);
    }
    // Edge case
    grid.push(
        generatePricedRow(
            lowPrice,
            option,
            dateAxis)
    );
    priceRange.push(lowPrice);

    // Sort prices from high to low
    priceRange.sort((a,b) => b-a)

    // How can we set a price range?
    // Prereq: lower bound < current price < upper bound
    // Take price range, divide by 20. That is each price increment

    console.log("grid: ", grid);
        

    return (
        <div className="grid-container">
        <div className="grid">
            {
                <>
                    <div key={`row-months`} className="grid-row">
                        {
                            rows[0]
                        }
                    </div>
                    <div key={`row-days`} className="grid-row">
                        {
                            rows[1]
                        }
                    </div>
                </>
            }
            {
                [...Array(gridHeight)].map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                    <div key={`cell-price-${priceRange[rowIndex].toFixed(2)}`} className={`grid-cell bold`}>
                        {"$"+priceRange[rowIndex].toFixed(1)}
                    </div>
                    {[...Array(gridWidth)].map((_, colIndex) => (
                            generatePriceCell(
                                rowIndex, 
                                colIndex, 
                                grid[rowIndex][colIndex],
                                option.currentPremium
                            )
                        ))}
                </div>
                ))
            }
        </div>
        </div>
    );
};

export default Grid;
