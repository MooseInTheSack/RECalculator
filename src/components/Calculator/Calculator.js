/* eslint-disable */
import * as React from "react";
import "./Calculator.css";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';

import {
  getMortgagePayment,
  findEstimatedPropertyTaxes,
  findEstimatedPMI,
} from "../../utils/mortgage";
import { currencyFormat } from "../../utils/currencyFormat";
import { getTotalCapitalExpenditures } from "../../utils/capex";
import { getEstimatedAnnualOperatingExpenses } from "../../utils/operating";
import { getTotals } from "../../utils/getTotals";

import CapitalExpenditures from "../CapitalExpenditures/CapitalExpenditures";
import Cocroi from "../Cocroi/Cocroi";

const findInitialPMI = (downpaymentpercent, price) => {
  if (
    parseFloat(downpaymentpercent) >= 0.0 &&
    parseFloat(downpaymentpercent) < 20.0
  ) {
    const principle = (price*(1-downpaymentpercent));

    return findEstimatedPMI(principle);
  } else {
    return 0.0;
  }
}

const convertToFloat = (input) => {
  const result = input !== "" && input !== undefined && !isNaN(input) ? parseFloat(input) : 0;
  return result;
}

export default function Calculator() {  
  const [price, setPrice] = React.useState(200000);
  const [interest, setInterest] = React.useState(5);
  const [downpaymentpercent, setDownPaymentPercent] = React.useState(20);
  const [years, setYears] = React.useState(30);
  const [downpayment, setDownPayment] = React.useState(40000);
  const [rent, setRent] = React.useState(1600);
  const [closingCostPercent, setClosingCostPercent] = React.useState(3);
  const [immediateRepairs, setImmediateRepairs] = React.useState(2000);

  const [estimatedMortgage, setEstimatedMortgage] = React.useState("NA");
  const [estimatedPropertyTaxes, setEstimatedPropertyTaxes] = React.useState(findEstimatedPropertyTaxes(parseFloat(price)));
  const [
    estimatedHousingInsurance,
    setEstimatedHousingInsurance,
  ] = React.useState(200);
  const [estimatedPMI, setEstimatedPMI] = React.useState(findInitialPMI(downpaymentpercent, price));
  
  //operating:
  const [monthlyInsurance, setMonthlyInsurance] = React.useState(100);
  const [monthlyPropertyManagement, setMonthlyPropertyManagement] = React.useState(rent*0.1);
  const [monthlyVacancy, setMonthlyVacancy] = React.useState(100);
  const [monthlyRepairs, setMonthlyRepairs] = React.useState(100);
  const [totalOperatingExpenses, setTotalOperatingExpenses] = React.useState(monthlyInsurance+monthlyRepairs+monthlyPropertyManagement+monthlyVacancy)

  const [dayOneCosts, setDayOneCosts] = React.useState(0);
  const [allExpenses, setAllExpenses] = React.useState("NA");

  const handleChange = (event) => {
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
    } else if (event.target.id === "propertytaxes") {
      setEstimatedPropertyTaxes(event.target.value)
    } else if (event.target.id === "estimatedHousingInsurance") {
      setEstimatedHousingInsurance(event.target.value)
    } else if (event.target.id === "estimatedPMI") {
      setEstimatedPMI(event.target.value)
    } else if (event.target.id === "immediateRepairs") {
      setImmediateRepairs(event.target.value)
    } else if (event.target.id === "monthlyInsurance") {
      setMonthlyInsurance(event.target.value)
    } else if (event.target.id === "monthlyPropertyManagement") {
      setMonthlyPropertyManagement(event.target.value)
    } else if (event.target.id === "monthlyVacancy") {
      setMonthlyVacancy(event.target.value)
    } else if (event.target.id === "monthlyRepairs") {
      setMonthlyRepairs(event.target.value)
    }
  };

  React.useEffect(() => {
    if (
      downpaymentpercent &&
      parseFloat(downpaymentpercent) >= 0 &&
      parseFloat(downpaymentpercent) <= 100
    ) {
      const downpaymentPercentFloat = parseFloat(downpaymentpercent) * 0.01;
      console.log('=====')
      console.log('downpaymentpercent of ', downpaymentpercent)
      console.log(' becomes downpaymentPercentFloat ', downpaymentPercentFloat)
      const downPaymentTotal = downpaymentPercentFloat * parseFloat(price);
      setDownPayment(downPaymentTotal);

      const principle = parseFloat(price) - downPaymentTotal;
      const interestFloat = parseFloat(interest) * 0.01;
      const numberOfYears = parseFloat(years);
      const principleAndInterest = getMortgagePayment(principle, interestFloat, numberOfYears);

      console.log('estimatedPMI:' ,estimatedPMI)
      const parsedPMI = estimatedPMI !== "" && estimatedPMI !== undefined && !isNaN(estimatedPMI) ? parseFloat(estimatedPMI) : 0;

      setEstimatedMortgage(principleAndInterest+parsedPMI);

      //find TOTAL of all expenses:
      const boof = getTotalCapitalExpenditures();
      const beef = getEstimatedAnnualOperatingExpenses(
        parseFloat(price),
        parseFloat(rent)
      );
      const totalCapEx = getTotals(boof) / 12;
      //const totalOp = getTotals(beef) / 12;
      const totalOp = convertToFloat(monthlyInsurance) + convertToFloat(monthlyPropertyManagement) + convertToFloat(monthlyVacancy) + convertToFloat(monthlyRepairs);
      setTotalOperatingExpenses(totalOp)

      //const estPropTaxes = findEstimatedPropertyTaxes(parseFloat(price));
      const parsedPropTaxes = estimatedPropertyTaxes !== "" && estimatedPropertyTaxes !== undefined && !isNaN(estimatedPropertyTaxes) ? parseFloat(estimatedPropertyTaxes) : 0;
      
      //const estInsurance = findEstimatedHouseInsurance(parseFloat(price));
      const parsedInsurance = estimatedHousingInsurance !== "" && estimatedHousingInsurance !== undefined && !isNaN(estimatedHousingInsurance) ? parseFloat(estimatedHousingInsurance) : 0;

      const totalExpensesToSet =
        principleAndInterest + totalCapEx + totalOp + parsedPropTaxes + parsedInsurance + parsedPMI;
      setAllExpenses(totalExpensesToSet);

      const parsedImmediateRepairs = immediateRepairs !== "" && immediateRepairs !== undefined && !isNaN(immediateRepairs) ? parseFloat(immediateRepairs) : 0;

      const closingCosts = closingCostPercent * price * 0.01;
      console.log('parsedImmediateRepairs: ', parsedImmediateRepairs)
      console.log('downPaymentTotal: ', downPaymentTotal)
      console.log('parsedImmediateRepairs: ', parsedImmediateRepairs)
      setDayOneCosts(parsedImmediateRepairs + downPaymentTotal + closingCosts);

      
    } else {
      setDownPayment(0.0);
      setEstimatedMortgage("NA");
    }
  }, [
    price, 
    downpaymentpercent, 
    interest, years, 
    estimatedPropertyTaxes, 
    estimatedHousingInsurance,
    estimatedPMI,
    immediateRepairs,
    monthlyInsurance,
    monthlyPropertyManagement,
    monthlyVacancy,
    monthlyRepairs
  ]);

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
          <div className="section">
            <h2>Day One Costs</h2>
            <h5>Down Payment</h5>
            <p>{currencyFormat(downpayment)}</p>

            <h5>Closing Costs</h5>
            <p>{currencyFormat(closingCostPercent * price * 0.01)}</p>

            <FormControl variant="standard">
              <TextField 
                label="Immediate Repairs" 
                variant="filled" 
                id="immediateRepairs"
                value={immediateRepairs}
                onChange={handleChange} 
              />
            </FormControl>

            <h5>Day One Costs:</h5>
            <p>
              {currencyFormat(dayOneCosts)}
            </p>
          </div>
          <div className="section">
          <h2>Mortgage Expenses</h2>

          <FormControl variant="standard">
            <TextField 
              label="Monthly Property Taxes" 
              variant="filled" 
              id="propertytaxes"
              value={estimatedPropertyTaxes}
              onChange={handleChange} 
            />
          </FormControl>

          <FormControl variant="standard">
            <TextField 
              label="Monthly Housing Insurance" 
              variant="filled" 
              id="estimatedHousingInsurance"
              value={estimatedHousingInsurance}
              onChange={handleChange} 
            />
          </FormControl>

          <FormControl variant="standard">
            <TextField 
              label="Monthly PMI" 
              variant="filled" 
              id="estimatedPMI"
              value={estimatedPMI}
              onChange={handleChange} 
            />
          </FormControl>

          <h5>Total Mortgage Expenses:</h5>
          <p>
            {currencyFormat(
              estimatedMortgage +
                estimatedPropertyTaxes +
                estimatedHousingInsurance +
                estimatedPMI
            )}
          </p>
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="section">
            <CapitalExpenditures price={price} />
            <br />
          </div>
        </Grid>
        <Grid item xs={6} md={3}>
          <div className="section">
            <h2>Monthly Operating Expenses</h2>
            <FormControl variant="standard">
              <TextField 
                label="Monthly Insurance Costs" 
                variant="filled" 
                id="monthlyInsurance"
                value={monthlyInsurance}
                onChange={handleChange} 
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField 
                label="Monthly Property Management" 
                variant="filled" 
                id="monthlyPropertyManagement"
                value={monthlyPropertyManagement}
                onChange={handleChange} 
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField 
                label="Monthly Vacancy" 
                variant="filled" 
                id="monthlyVacancy"
                value={monthlyVacancy}
                onChange={handleChange} 
              />
            </FormControl>
            <FormControl variant="standard">
              <TextField 
                label="Monthly Repairs" 
                variant="filled" 
                id="monthlyRepairs"
                value={monthlyRepairs}
                onChange={handleChange} 
              />
            </FormControl>
            <h5>Total Operating Expenses:</h5>
            <p>{currencyFormat(totalOperatingExpenses)}</p>
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
        <div className="section">
          <h2>ALL EXPENSES:</h2>
          <p>{currencyFormat(allExpenses)}</p>

          <h2>Revenue:</h2>
          <p>{currencyFormat(rent)}</p>

          <h2>Cash Flow:</h2>
          <p>{currencyFormat(rent - allExpenses)}</p>

          <Cocroi
            cashFlow={rent - allExpenses}
            downPayment={downpayment}
            closingCosts={closingCostPercent * price * 0.01}
            immediateRepairs={immediateRepairs}
          />
        </div>
        </Grid>
      </Grid>
    </Box>
  );
}
