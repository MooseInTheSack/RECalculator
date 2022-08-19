import * as React from 'react';
import { getTotalCapitalExpenditures } from '../../utils/capex';
import { currencyFormat } from '../../utils/currencyFormat';
import { getTotals } from '../../utils/getTotals';

export default function CapitalExpenditures(props) {

    const tifs = getTotalCapitalExpenditures();
    var tifOptions = Object.keys(tifs).map(function(key) {
        return <p>{key}: {currencyFormat(tifs[key]/12)}</p>
    });

    return (
        <div>
            <h2>Monthly Capital Expenditures</h2>
            {tifOptions}
            <h5>Total Monthly Capital Expenditures:</h5>
            {currencyFormat(getTotals(tifs)/12)}
        </div>
    )
}