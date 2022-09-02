import * as React from 'react';
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';

import { getEstimatedAnnualOperatingExpenses } from '../../utils/operating';
import { currencyFormat } from '../../utils/currencyFormat';
import { getTotals } from '../../utils/getTotals';


export default function Operating(props) {

    const handleChange = (event) => {
        if (event.target.id === "test") {
            setTest(event.target.value);
        }
    }

    const [test, setTest] = React.useState(0);

    React.useEffect(() => {
        console.log('test new value: ', test)
    }, [test])

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

            <h2>Test</h2>
            <FormControl variant="standard">
                <TextField 
                label="Test Label" 
                variant="filled" 
                id="test"
                value={test}
                onChange={handleChange} 
                />
            </FormControl>
            <h5>Total Operating Expenses:</h5>
            {currencyFormat(getTotals(tifs)/12)}
        </div>
    )
}