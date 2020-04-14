import moment from 'moment';

const getStart = (data) => {
    let orderedDates = sortDataByDate(data);

    return moment(orderedDates[0]?.time);
}

const getEnd = (data) => {
    let orderedDates = sortDataByDate(data);
    
    return moment(orderedDates[orderedDates.length-1]?.time);
}

const getOutput = (data, region, time) => {
    return data?.find(x => x.region === region)?.forecast
        .find(x => moment(x.time).isSame(time))?.solarMW
};

function sortDataByDate(data){
    let dates = [];
    data.forEach(item => {
        dates.push(...item.forecast);
    })
    let orderedDates = dates.sort(function (a, b) {
        if(!a || !b){
            console.log('found null');
            console.log(`a = ${a}`);
            console.log(`b = ${b}`);
        }
        return moment(a.time).valueOf()- moment(b.time).valueOf();
    });

    return orderedDates;
}

export default {
    getStart,
    getEnd,
    getOutput
}