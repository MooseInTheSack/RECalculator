export const getMortgagePayment = (principle, interest, years ) => {
    //M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]. 
    const months = years*12;
    const monthlyInterest = interest/12.0;

    const firstPart = (1+monthlyInterest)**months;
    return principle*(monthlyInterest*firstPart)/(firstPart-1);
}

export const findEstimatedPropertyTaxes = (price) => {
    return (price*0.012/12);
}

export const findEstimatedHouseInsurance = (price) => {
    // dividing the home's value by 1,000, then multiplying the result by $3.50
    return (price*3.50/12000)
}

export const findEstimatedPMI = (price) => {
    //You can expect to pay between $30 and $70 per month for every $100,000 borrowed.
    return (price / 100000) * 70;
}