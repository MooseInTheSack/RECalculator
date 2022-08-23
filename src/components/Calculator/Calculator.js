import * as React from "react";
import "./Calculator.css";
import Box from "@mui/material/Box";
import FilledInput from "@mui/material/FilledInput";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Grid from "@mui/material/Grid";

import {
  getMortgagePayment,
  findEstimatedPropertyTaxes,
  findEstimatedHouseInsurance,
  findEstimatedPMI,
} from "../../utils/mortgage";
import { currencyFormat } from "../../utils/currencyFormat";
import { getTotalCapitalExpenditures } from "../../utils/capex";
import { getEstimatedAnnualOperatingExpenses } from "../../utils/operating";
import { getTotals } from "../../utils/getTotals";

import CapitalExpenditures from "../CapitalExpenditures/CapitalExpenditures";
import Operating from "../Operating/Operating";
import Cocroi from "../Cocroi/Cocroi";

export default function Calculator() {
  const [price, setPrice] = React.useState(200000);
  const [interest, setInterest] = React.useState(5);
  const [downpaymentpercent, setDownPaymentPercent] = React.useState(20);
  const [years, setYears] = React.useState(30);
  const [downpayment, setDownPayment] = React.useState(80000);
  const [rent, setRent] = React.useState(1600);
  const [closingCostPercent, setClosingCostPercent] = React.useState(3);

  const [estimatedMortgage, setEstimatedMortgage] = React.useState("NA");
  const [estimatedPropertyTaxes, setEstimatedPropertyTaxes] = React.useState(
    "NA"
  );
  const [
    estimatedHousingInsurance,
    setEstimatedHousingInsurance,
  ] = React.useState("NA");
  const [estimatedPMI, setEstimatedPMI] = React.useState("NA");

  const [allExpenses, setAllExpenses] = React.useState("NA");

  const handleChange = (event) => {
    const valueToCheck = event.target.value;
    if (event.target.id === "price") {
      setPrice(event.target.value);
    } else if (event.target.id === "downpaymentpercent") {
      setDownPaymentPercent(event.target.value);
    } else if (event.target.id === "interest") {
      setInterest(event.target.value);
    } else if (event.target.id === "years") {
      setYears(event.target.value);
    } else if (event.target.id === "rent") {
      setRent(event.target.value);
    } else if (event.target.id === "closingcostpercent") {
      setClosingCostPercent(event.target.value);
    }
  };

  React.useEffect(() => {
    if (
      downpaymentpercent &&
      parseFloat(downpaymentpercent) >= 0 &&
      parseFloat(downpaymentpercent) <= 100
    ) {
      const downpaymentPercentFloat = parseFloat(downpaymentpercent) * 0.01;
      const downPaymentTotal = downpaymentPercentFloat * parseFloat(price);
      setDownPayment(downPaymentTotal);

      const principle = parseFloat(price) - downPaymentTotal;
      const interestFloat = parseFloat(interest) * 0.01;
      const numberOfYears = parseFloat(years);
      const yeet = getMortgagePayment(principle, interestFloat, numberOfYears);

      setEstimatedMortgage(yeet);

      //find TOTAL of all expenses:
      const boof = getTotalCapitalExpenditures();
      const beef = getEstimatedAnnualOperatingExpenses(
        parseFloat(price),
        parseFloat(rent)
      );
      const totalCapEx = getTotals(boof) / 12;
      const totalOp = getTotals(beef) / 12;

      const estPropTaxes = findEstimatedPropertyTaxes(parseFloat(price));
      const estInsurance = findEstimatedHouseInsurance(parseFloat(price));
      /*
      console.log("totalCapEx: ", totalCapEx);
      console.log("estInsurance: ", estInsurance);
      console.log("totalOp: ", totalOp);
      console.log("estPropTaxes: ", estPropTaxes);
      console.log("estInsurance: ", estInsurance);
      console.log("yeet: ", yeet);
*/
      const totalExpensesToSet =
        yeet + totalCapEx + totalOp + estPropTaxes + estInsurance;
      setAllExpenses(totalExpensesToSet);

      if (
        parseFloat(downpaymentpercent) >= 0.0 &&
        parseFloat(downpaymentpercent) < 20.0
      ) {
        const estPMI = findEstimatedPMI(principle);
        setEstimatedPMI(estPMI);
      } else {
        const estPMI = 0.0;
        setEstimatedPMI(estPMI);
      }
    } else {
      setDownPayment(0.0);
      setEstimatedMortgage("NA");
    }
  }, [price, downpaymentpercent, interest, years]);

  React.useEffect(() => {
    const estPropTaxes = findEstimatedPropertyTaxes(parseFloat(price));
    setEstimatedPropertyTaxes(estPropTaxes);

    const estInsurance = findEstimatedHouseInsurance(parseFloat(price));
    setEstimatedHousingInsurance(estInsurance);
  }, [estimatedMortgage]);

  return (
    <Box
      className="box"
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <h2>Inputs</h2>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Purchase Price</InputLabel>
        <Input id="price" value={price} onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Down Payment %</InputLabel>
        <Input
          id="downpaymentpercent"
          value={downpaymentpercent}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Interest Rate</InputLabel>
        <Input id="interest" value={interest} onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Loan Years</InputLabel>
        <Input id="years" value={years} onChange={handleChange} />
      </FormControl>

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Closing Cost %</InputLabel>
        <Input
          id="closingcostpercent"
          value={closingCostPercent}
          onChange={handleChange}
        />
      </FormControl>

      <br />

      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Rent to Charge</InputLabel>
        <Input id="rent" value={rent} onChange={handleChange} />
      </FormControl>

      <hr />

      <Grid container spacing={0}>
        <Grid item xs={6} md={3}>
          <h2>Mortgage Expenses</h2>
          <h5>Down Payment</h5>
          <p>{currencyFormat(downpayment)}</p>

          <h5>Closing Costs</h5>
          <p>{currencyFormat(closingCostPercent * price * 0.01)}</p>

          <h5>Immediate Repairs</h5>
          <p>{currencyFormat(2000)}</p>

          <h5>Day One Costs:</h5>
          <p>
            {currencyFormat(
              downpayment + closingCostPercent * price * 0.01 + 2000
            )}
          </p>

          <h5>Estimated Principle + Interest Payment:</h5>
          <p>{currencyFormat(estimatedMortgage)}</p>

          <h5>Estimated Monthly Property Taxes:</h5>
          <p>{currencyFormat(estimatedPropertyTaxes)}</p>

          <h5>Estimated Monthly Housing Insurance:</h5>
          <p>{currencyFormat(estimatedHousingInsurance)}</p>

          <h5>Estimated Monthly PMI</h5>
          <p>{currencyFormat(estimatedPMI)}</p>

          <h5>TOTAL:</h5>
          <p>
            {currencyFormat(
              estimatedMortgage +
                estimatedPropertyTaxes +
                estimatedHousingInsurance +
                estimatedPMI
            )}
          </p>
        </Grid>
        <Grid item xs={6} md={3}>
          <br />
          <CapitalExpenditures price={price} />
        </Grid>
        <Grid item xs={6} md={3}>
          <br />
          <Operating price={price} rent={rent} />
        </Grid>
        <Grid item xs={6} md={3}>
          <h2>ALL EXPENSES:</h2>
          <p>{currencyFormat(allExpenses)}</p>

          <h2>Revenue:</h2>
          <p>{currencyFormat(rent)}</p>

          <h2>Cash Flow:</h2>
          <p>{currencyFormat(rent - allExpenses)}</p>

          <h2>CoCroi:</h2>
          <Cocroi
            cashFlow={rent - allExpenses}
            downPayment={downpayment}
            closingCosts={closingCostPercent * price * 0.01}
            immediateRepairs={2000}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
