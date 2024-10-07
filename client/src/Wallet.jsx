import server from "./server";
import { credentials } from "./pub-pk";
import { signMessage, serializableSignature } from "./utils";

function Wallet({ address, setAddress, balance, setBalance, setSignature, setMessage }) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);

    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);

      setBalance(balance);
     
      // set message so it can passed to the backend through params
      const message = `Send ${balance} to recipient`
      setMessage(message)

      // sign the message and set the signature state
      const signedMessage = await signMessage(message, credentials[address]);
      const serializedSignature = serializableSignature(signedMessage);

      setSignature(serializedSignature)
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
