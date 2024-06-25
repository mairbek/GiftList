const express = require('express');
const verifyProof = require('../utils/verifyProof');
const MerkleTree = require('../utils/MerkleTree');
const niceList = require('../utils/niceList.json');


const port = 1225;

const app = express();
app.use(express.json());
// create the merkle tree for the whole nice list
const merkleTree = new MerkleTree(niceList);

const MERKLE_ROOT = merkleTree.getRoot();

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  console.log(body)

  // TODO: prove that a name is in the list 
  if (verifyProof(body.proof, body.name, MERKLE_ROOT)) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
