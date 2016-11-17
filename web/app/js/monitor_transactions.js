$(document).ready(function() {
	var Web3 = require('web3');
    var web3 = new Web3();
    var eth = web3.eth; //Contém os métodos relacionados ethereum blockchain.
   
    // Conexão com o BlockChain
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));
    var number = web3.eth.blockNumber;
    var list_transactions = $("#list_transactions");
    var count_transactions = 0;
	 
    var filter = web3.eth.filter('latest');
	filter.watch(function(error, result) {
		if (!error) {
			var get_block = web3.eth.getBlock(result);	
			if(get_block.transactions.length){
				_.forEach(get_block.transactions, function(transactionHash) {
				   	transaction = web3.eth.getTransaction(transactionHash);
				   	list_transactions.prepend(htmlTransaction(transactionHash,transaction.to,transaction.from));
					count_transactions++;
				});
			}
		}
	});

	function htmlTransaction(hash,to,from){
		var html = "<tr>";
			html += "<th scope='row'>"
				html += count_transactions
			html += "</th>"
			html += "<td>"
				html += from
			html += "</td>"
			html += "<td>"
				html += to
			html += "</td>"
			html += "<td>"
				html += hash
			html += "</td>"
		html += "</tr>"; 
		
		return html;	
	}
});