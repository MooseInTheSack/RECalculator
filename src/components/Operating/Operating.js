import * as React from 'react';
import { getEstimatedAnnualOperatingExpenses } from '../../utils/operating';
import { currencyFormat } from '../../utils/currencyFormat';
import { getTotals } from '../../utils/getTotals';

export default function Operating(props) {

    const totalOpExpenses = getEstimatedAnnualOperatingExpenses(props.price, props.rent)

    //const tifs = operatingExpenses();
    const tifs = totalOpExpenses;
    var tifOptions = Object.keys(tifs).map(function(key) {
        return <p>{key}: {currencyFormat(tifs[key]/12)}</p>
    });

    return (
        <div>
            <h2>Monthly Operating Expenses</h2>
            {tifOptions}
            <h5>Total Operating Expenses:</h5>
            {currencyFormat(getTotals(tifs)/12)}
        </div>
    )
}