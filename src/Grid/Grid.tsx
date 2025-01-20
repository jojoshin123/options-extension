// Grid.tsx
import { useState } from "react";
import "./Grid.scss";
import { divideDateInterval } from "../util/DateUtil";
import { ReactElement } from "react";
import { blackScholes } from "../util/BlackScholes";
import { Option } from "../types/Option";

interface GridProps {
  option: Option;
  currentPrice : number;
}

function generateCell(rowIndex: number, colIndex: number, content: string): ReactElement {
  return (
    <div key={`cell-${rowIndex}-${colIndex}`} className="grid-cell">
      {content}
    </div>
  );
}

function generateMonthRow(dateArray : Date[]): ReactElement[][] {

    const CELL_WIDTH : number = 42;

    const monthArray : ReactElement[] = []
    const dayArray : ReactElement[] = []
    const justMonthArray = dateArray.map(d=>d.toDateString().slice(4,7));
    const justDaysArray = dateArray.map(d=>d.toDateString().slice(8,10));

    let currMonth : string = justMonthArray[0];
    let currWidth : number = 0;
    let colorClass : string = "grid-month-light";

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
    
        for (let i = 0; i<dateAxis.length-1;i++){

            const dte = (option.expiration.valueOf() - dateAxis[i].valueOf())/86400000/365
            console.log("STATS====== ", { 
                price: price,
                strike: option.strike,
                dte: dte,
                rate: 0.0429,
                vol: option.volatility/100
            });

            toReturn.push(
                parseFloat(blackScholes(
                    price,    // Current stock price
                    option.strike,    // Strike price
                    dte,      // Time to maturity (1 year)
                    0.0429,   // Risk-free rate (5%)
                    option.volatility/100     // Volatility (20%)
                ).call.toFixed(1))
            );
            
        }
        return toReturn
  }


const Grid = ({ option, currentPrice } : GridProps) => {

    const [grid, _] = useState<number[][]>([])

    const dateAxis: Date[] = divideDateInterval(option.expiration)
    const gridWidth = dateAxis.length;
    const gridHeight = 20;

    // Months and days title rows
    const rows : ReactElement[][] = generateMonthRow(dateAxis);

    const totalDTE : number = (option.expiration.valueOf() - dateAxis[0].valueOf())/86400000;

    console.log("totalDTE: ", { totalDTE: totalDTE })

    // For each row, call populateRow based on gridHeight/2 being the center price
    for (let i = 0; i<gridHeight/2;i++){
        grid.push(
            generatePricedRow(
                currentPrice + ((gridHeight/2)-i) ,
                option,
                dateAxis)
        );
    }

    for (let i = gridHeight/2; i>=0;i--){
        grid.push(
            generatePricedRow(
                currentPrice - ((gridHeight/2)-i) ,
                option,
                dateAxis)
        );
    }

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
                    {[...Array(gridWidth)].map((_, colIndex) => (
                            generateCell(rowIndex, colIndex, (grid[rowIndex][colIndex] - option.currentPremium).toFixed(1) + "%")
                        ))}
                </div>
                ))
            }
        </div>
        </div>
    );
};

export default Grid;
