import React , { useRef } from "react";
import ReactToPrint from 'react-to-print';
import './App.css';
import { Calculator } from '../Calculator/Calculator';

function App() {
  const componentRef = useRef();

  return (
    <div className="App">
      <Calculator ref={componentRef} />
      <ReactToPrint
        trigger={() => <button>Print this out!</button>}
        content={() => componentRef.current}
      />
    </div>
  );
}

export default App;
