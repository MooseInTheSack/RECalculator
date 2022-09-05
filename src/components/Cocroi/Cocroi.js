/* eslint-disable */
import * as React from "react";
import NumberFormat from "react-number-format";

const convertToFloat = (input) => {
  const result = input !== "" && input !== undefined && !isNaN(input) ? parseFloat(input) : 0;
  return result;
}

export default function CapitalExpenditures(props) {
  const [cocroiValue, setCocroiValue] = React.useState(0);

  React.useEffect(() => {
    const totalExpenses =
    convertToFloat(props.downPayment) + convertToFloat(props.closingCosts) + convertToFloat(props.immediateRepairs);
    const cocroi = (convertToFloat(props.cashFlow) * 12) / totalExpenses;

    console.log('=====');
    console.log('props.downpayment: ', props.downpayment);
    console.log('props.closingCosts: ', props.closingCosts);
    console.log('props.cashFlow: ', props.cashFlow);
    console.log('props.immediateRepairs: ', props.immediateRepairs);
    console.log('cocroi: ', cocroi);

    setCocroiValue(cocroi * 100);
  }, [props.downpayment, props.closingCosts, props.cashFlow, props.immediateRepairs]);
  return (
    <div>
      <h5>Cash-on-Cash Return:</h5>
      <NumberFormat
        suffix={"%"}
        decimalScale={2}
        value={cocroiValue}
        displayType="text"
      />
    </div>
  );
}
