export const getTotals = (dict) => {
    var sum = 0;
    Object.keys(dict).map(function(key) {
        sum += (dict[key]);
    });

    return sum;
}