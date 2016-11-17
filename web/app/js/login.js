$(document).ready(function() {
	var Web3 = require('web3');
    var web3 = new Web3();
    var eth = web3.eth; //Contém os métodos relacionados ethereum blockchain.
   
    // Conexão com o BlockChain
    web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

    var btn_login 		= $("#btnLogin");
	var electoral_title = $("#electoral_title");
	
	btn_login.click(function(){
		if(electoral_title.val() != ""){
			find = _.find(people_voters, {'titulo_eleitoral':electoral_title.val()});
			
			if(find){
				localStorage.setItem("login", JSON.stringify(find));
				localStorage.setItem("order_candidates", JSON.stringify([{id:1,label:"Deputado estadual"},{id:2,label:"Deputado federal"},{id:3,label:"Senador"},{id:4,label:"Governador"},{id:5,label:"Presidente"}]));

				window.location = "vote.html"
			}else{
				alertify.error('Eleitor não encontrado.');
			}
		}else{
			alertify.error('Coloque seu titulo eleitoral.');
		}
	});	
});