$(document).ready(function () {
  var Web3 = require('web3');
  var web3 = new Web3();
  var eth = web3.eth; //Contém os métodos relacionados ethereum blockchain.

  // Conexão com o BlockChain
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


  // Carregando contrato
  var votaCoinContract = web3.eth.contract(abiVotaCoin);
  var votaCoin = votaCoinContract.at(votaCoinAddress);

  window.createPoliticsOnContract = function () {
    _.each(seed_candidates, function (seed_candidate) {
      votaCoin.addPolitical(seed_candidate.wallet, seed_candidate.tipo, {
        value: 0,
        gas: 321 + 305600,
        gasPrice: 20000000000
      }, function (err, hash) {});

    });
  }

  window.testVote = function () {
    votaCoin.voteTo('0xe9b7b62d7d3fffa90943543b091557183b87d3d2', '0x73c78d7094544c69cd4bff1ea977c3af4dcb9c84', {
      value: 1,
      gas: 321 + 305600,
      gasPrice: 20000000000
    }, function (err, hash) {});
  }

  var votes = 0;
  var politicals = 0;
  setInterval(function () {
    votaCoin.votes_count(function (asdasd, value) {
      votes = value.toNumber();
      console.log('politicals_count => ' + politicals + ' / votes_count => ' + votes);
    });
    votaCoin.politicals_count(function (asdasd, value) {
      politicals = value.toNumber();
      console.log('politicals_count => ' + politicals + ' / votes_count => ' + votes);
    });
  }, 1000);

});