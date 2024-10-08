const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const { recoverPublicKey } = require("./utils")

app.use(cors());
app.use(express.json());

const balances = {
  "03eec72d0990127f21a05539080e2c926b05a323c8818a2afc6d3f119978edfb97": 100,  // 3166d3dae69fa48dc8174248312580b9bf88204cab9ea5818d5dfed3c27319df
  "0335fa17397692b892550bec2d223b1612e998289dea2e36dcad3b99eddae33204": 50, // af84767478745652b25164b4e59c1b8a475fabcd99746be4f654df171e864006
  "033ca517c930ad4499fae3996fd08bf8e229433c36468380a204baf7a4d09a713d": 75, // 388d5f4a77a3a33fd7c3d3555b0c45250bcd5fc15d32c2864040e225fd26602a
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  // refactored the send action to derive the address from the signature
  // instead of having the client-side send that
  // it can be maliciously to use the sender address from the client-side

  const { signature, message, recipient, amount } = req.body;

  const sender = recoverPublicKey(message, signature)

  setInitialBalance(sender);
  setInitialBalance(recipient);

  
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
