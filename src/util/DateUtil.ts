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
        toReturn.push(addDays(today, daysIncrement*i))
    }
    // Manually set last column
    toReturn[INTERVAL_COUNT-1] = expiration
    console.log(toReturn)

    return toReturn
}

export{
    divideDateInterval
}