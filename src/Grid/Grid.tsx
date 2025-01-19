// Grid.tsx
// import { useEffect, useState } from "react";
import "./Grid.scss";
import { divideDateInterval } from "../util/DateUtil";
import { ReactElement } from "react";

interface GridProps {
  expiration: Date;
}

function mapColumns(rowIndex: number, colIndex: number, content: string): ReactElement {
  return (
    <div key={`cell-${rowIndex}-${colIndex}`} className="grid-cell">
      {content}
    </div>
  );
}

function generateMonthRow(dateArray : Date[]): ReactElement[][] {

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
            const temp : number = (34*currWidth)-2
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
            <div key={`cell-${justDaysArray[i]}`} className={`grid-cell ${colorClass}`}>
                {justDaysArray[i].toString()}
            </div>
        );

    }
    // Edge case
    const temp : number = (34*currWidth)-2
    monthArray.push(
        <div key={`cell-${currMonth}`} className={`grid-cell bold ${colorClass}`} style={{ width: `${temp}px` }}>
            {currMonth}
        </div>
    );

    return [monthArray, dayArray]
  }


const Grid = (expiration: GridProps) => {
  const gridSize = 20;

  //   const [grid, setGrid] = useState<number[][]>([])
  //   useEffect(() => {

  //   });

  const dateAxis: Date[] = divideDateInterval(expiration.expiration)
//   .map(
//     (date) => date.toISOString().slice(0,10) // get the raw date
//   );
  const rows : ReactElement[][] = generateMonthRow(dateAxis);

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
            [...Array(gridSize)].map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid-row">
                {[...Array(gridSize)].map((_, colIndex) => (
                        mapColumns(rowIndex, colIndex, "xyz")
                    ))}
            </div>
            ))
        }
      </div>
    </div>
  );
};

export default Grid;
