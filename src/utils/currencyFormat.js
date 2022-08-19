export const currencyFormat = (stringNum) => {
    const num = parseFloat(stringNum)
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }