const INTERVAL_COUNT = 20

function addDays (date: Date, days: number) : Date {
    var d = new Date(date.valueOf());
    d.setDate(date.getDate() + days);
    return d;
}

function divideDateInterval(expiration: Date): Date[] {
    
    let toReturn : Date[] = []

    const today : Date = new Date()
    today.setHours(0)
    today.setMinutes(0)
    today.setSeconds(0)
    today.setMilliseconds(0)

    const daysIncrement = ((expiration.valueOf()-today.valueOf())/86400000)/INTERVAL_COUNT

    // Stop before last column
    for (let i=0; i<INTERVAL_COUNT-1;i++){
        const newDay : Date = addDays(today, daysIncrement*i);
        if (toReturn.length > 0){
            console.log(toReturn[toReturn.length-1])
        }
        if (toReturn.length > 0 && 
            newDay.toISOString().slice(0, 16) == toReturn[toReturn.length-1].toISOString().slice(0, 16)){
            continue
        }else{
            toReturn.push(newDay)
        }
    }

    // If there aren't 20 columns
    if (toReturn.length < INTERVAL_COUNT-1){
        toReturn[toReturn.length-1] = expiration
    }else{
        // Manually set last column
        toReturn[INTERVAL_COUNT-1] = expiration
    }
    
    console.log(toReturn)

    return toReturn
}

export{
    divideDateInterval
}