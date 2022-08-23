/* eslint-disable */
export const getTotals = (dict) => {
    var sum = 0;
    const yeet = Object.keys(dict).map(function(key) {
        sum += (dict[key]);
    });

    return sum;
}