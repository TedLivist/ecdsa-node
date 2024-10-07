import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [signature, setSignature] = useState(null);
  const [message, setMessage] = useState("");

  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
        // add signature and message to be passed to backend through Transfer component
        setSignature={setSignature}
        setMessage={setMessage}
      />
      <Transfer setBalance={setBalance} address={address} signature={signature} message={message} />
    </div>
  );
}

export default App;
