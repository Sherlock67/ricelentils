const { formatDateToYMD, isDateSame } = require('../utils');
const dataStoreService = require('./data-store.service.js');

function getUsersByEngagementStatus(startDate, endDate, conditionProvider) {
    const userIDs = dataStoreService.getUsersID();
    const activeUserIDs = [];

    userIDs.forEach(id => {        
        const startDateObj = new Date(startDate);
        const dateAfterEndDate = new Date(endDate);
        const dateToDayID = dataStoreService.getUserDateToDayID(id);
        const dayIDs = [];
        let countOfMeals = 0;

        dateAfterEndDate.setDate(dateAfterEndDate.getDate() + 1);

        while (!isDateSame(startDateObj, dateAfterEndDate)) {
            const dayID = dateToDayID[formatDateToYMD(startDateObj)];
            if (dayID) dayIDs.push(dayID);
            startDateObj.setDate(startDateObj.getDate() + 1);
        }
        
        const mealToDayID = dataStoreService.getUserMealToDay(id);

        for (key in mealToDayID) {
            if (dayIDs.includes(mealToDayID[key])) ++countOfMeals;
        }

        if (conditionProvider(countOfMeals)) activeUserIDs.push(id);
    });
    
    return activeUserIDs.join(',');
}

function getActiveUsers(startDate, endDate) {
    return getUsersByEngagementStatus(startDate, endDate, countOfMeals => countOfMeals >= 5 && countOfMeals <= 10);
}

function getSuperActiveUsers(startDate, endDate) {
    return getUsersByEngagementStatus(startDate, endDate, countOfMeals => countOfMeals > 10);
}

function getBoredUsers(startDate, endDate) {
    return getUsersByEngagementStatus(startDate, endDate, countOfMeals => countOfMeals < 5);
}

function executeQueryOperations(operationName, args) {
    if (operationName.toLowerCase() === 'active') return getActiveUsers(...args);
    if (operationName.toLowerCase() === 'superactive') return getSuperActiveUsers(...args);
    if (operationName.toLowerCase() === 'bored') return getBoredUsers(...args);
    return null;
}

exports.executeQueryOperations = executeQueryOperations;