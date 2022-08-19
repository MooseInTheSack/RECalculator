export const getEstimatedAnnualOperatingExpenses = (price, rent) => {
    return {
        'Insurance' : 1383,
        'Property Management' : rent*12*0.1,
        'Vacancy': rent*0.05,
        'Repairs': rent*0.05,
    }
}