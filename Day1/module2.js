exports.getAge = function (Name, Date) {

    if (Date.getFullYear() >= 2023)
    {
        return "AgeCalculator";
    }
    else 
    {
        var Age = calculateAge(Date);
        return `Hello ${Name} Your Age is ${Age}`;
    }
};

function calculateAge(birthDay) {

    var TodayDate = new Date();
    var Years = TodayDate.getFullYear() - birthDay.getFullYear();
    var Months = TodayDate.getMonth() - birthDay.getMonth();

    if (Months < 0 || (Months === 0 && TodayDate.getDate() < birthDay.getDate())) 
    {
        Years--;
    }

    return Years;
}