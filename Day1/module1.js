exports.add = function (x, y) {

    if (!isNaN(x) && !isNaN(y)) 
    {
	    return x + y;
    }
    else 
    {
        return "Invalid Number Entered"
    }
};
  
exports.sub = function (x, y) {

    if (!isNaN(x) && !isNaN(y)) {
        return x - y;
    }
    else 
    {
        return "Invalid Number Entered"
    }
};
  
exports.mult = function (x, y) {

    if (!isNaN(x) && !isNaN(y)) {
        return x * y;
    }
    else 
    {
        return "Invalid Number Entered"
    }
};

