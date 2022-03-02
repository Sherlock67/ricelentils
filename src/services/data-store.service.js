const dataStore = require('../datastore');

function DataStoreService() {
    this.getUsersID = function() { return Object.keys(dataStore); };
    this.getUserData = function(id) { return dataStore[id]; };
    this.getUserMealToDay = function(id) { return this.getUserData(id).calendar.mealIdToDayId; };
    this.getUserDishToMeal = function(id) { return this.getUserData(id).calendar.dishIdToMealId; };
    this.getUserDateToDayID = function(id) { return this.getUserData(id).calendar.dateToDayId; };
    this.getUserDayDetails = function(id, dayID) { return this.getUserData(id).calendar.daysWithDetails[dayID]; };
}

module.exports = new DataStoreService();