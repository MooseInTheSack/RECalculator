/* eslint-disable no-eval */
import * as React from "react";
import NumberFormat from "react-number-format";

export default function CapitalExpenditures(props) {
  const [cocroiValue, setCocroiValue] = React.useState(0);

  React.useEffect(() => {
    const totalExpenses =
      props.downPayment + props.closingCosts + props.immediateRepairs;
    const bob = (props.cashFlow * 12) / totalExpenses;

    setCocroiValue(bob * 100);
  }, [props.downpayment, props.cashFlow]);
  return (
    <div>
      <h5>Cash-on-Cash Return on Investment:</h5>
      <NumberFormat
        suffix={"%"}
        decimalScale={2}
        value={cocroiValue}
        displayType="text"
      />
    </div>
  );
}
