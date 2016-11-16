$(document).ready(function() {
	var Web3 = require('web3');
    var web3 = new Web3();
    var eth = web3.eth; //Contém os métodos relacionados ethereum blockchain.

    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    var version = web3.version.api;
	console.log(version); // "0.2.0"
});