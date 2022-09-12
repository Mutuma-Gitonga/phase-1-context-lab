/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

    
 function createEmployeeRecord ([firstName, familyName, title, payRate]) {
    return {
        firstName : firstName,
        familyName : familyName,
        title : title,
        payPerHour : payRate,
        timeInEvents : [],
        timeOutEvents : []
    }
}


function createEmployeeRecords (nestedArrays) {

    let newObjectsArray = nestedArrays.map(array => createEmployeeRecord(array));
    
    return newObjectsArray;
} 


function createTimeInEvent (dateTimeStamp) {
  
    let dateHourArr = dateTimeStamp.split(" ");

    this.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(dateHourArr[1], 10), 
      date: dateHourArr[0],
    });
  
    return this;
}

function createTimeOutEvent (dateTimeStamp) {
    
    let dateHourArr = dateTimeStamp.split(" ");
  
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateHourArr[1], 10), 
        date: dateHourArr[0],
    });

    return this;
}

function hoursWorkedOnDate (dateStamp) {

    let timeInRecord = this.timeInEvents.find(record => record.date === dateStamp);
    let timeIn = timeInRecord.hour;
  
    let timeOutRecord = this.timeOutEvents.find(record => record.date === dateStamp);
    let timeOut = timeOutRecord.hour;
  
    return (timeOut - timeIn)/100;
}

function wagesEarnedOnDate (dateStamp) {
    
    let hoursWorkedOnDateBoundRecord = hoursWorkedOnDate.bind(this);

    let hoursWorked = hoursWorkedOnDateBoundRecord(dateStamp);

    return hoursWorked * this.payPerHour;
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) 

    return payable
}

function findEmployeeByFirstName (employeesObjectsArr,firstNameString) {
    return employeesObjectsArr.find(employee => employee.firstName === firstNameString);
}

function calculatePayroll(employeesObjectsArr) {
    return employeesObjectsArr.reduce((sum, employee) => sum + allWagesFor.call(employee), 0);
}
