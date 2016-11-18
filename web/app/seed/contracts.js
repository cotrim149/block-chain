var abiVotaCoin = [{
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }, {
    "name": "_to",
    "type": "address"
  }],
  "name": "voteTo",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_from",
    "type": "address"
  }],
  "name": "voterAlreadyVote",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "count_votes_per_candidates",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "votes_count",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "politicals_count",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [{
    "name": "",
    "type": "address"
  }],
  "name": "voter_has_voted",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "constant": false,
  "inputs": [{
    "name": "_wallet",
    "type": "address"
  }, {
    "name": "_politic_type",
    "type": "uint256"
  }],
  "name": "addPolitical",
  "outputs": [{
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "inputs": [],
  "type": "constructor"
}];
var votaCoinAddress = '0x2ba25711fa1f94998d875bf80acbc2cccdf9abbb';
var votaCoinGas = 346 + 328600;