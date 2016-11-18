$(document).ready(function() {

	var Web3 = require('web3');
  	var web3 = new Web3();
  	var eth = web3.eth; //Contém os métodos relacionados ethereum blockchain.

  	// Conexão com o BlockChain
  	web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

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
      "name": "_to",
      "type": "address"
    }],
    "name": "isPoliticalWallet",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_from",
      "type": "address"
    }, {
      "name": "_to",
      "type": "address"
    }],
    "name": "votingValid",
    "outputs": [{
      "name": "",
      "type": "bool"
    }],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "votingSize",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "politicalSize",
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
  var votaCoinAddress = '0x87dfa87d0b8296294529f4f7b6838e23b385659e';

  // Carregando contrato
  var votaCoinContract = web3.eth.contract(abiVotaCoin);
  var votaCoin = votaCoinContract.at(votaCoinAddress);

	var user_logged = JSON.parse(localStorage.getItem("login"));
  	var order_candidates = JSON.parse(localStorage.getItem("order_candidates"));

	var input = $('#vote-input');
	var branco = $('#btn-branco');
	var corrige = $('#btn-corrige');
	var confirma = $('#btn-confirma');
	var confirmation_vote = $("#confirmation_vote");
  	var vote_null = $("#vote_null");
  	var cancel_vote = $("#cancel_vote");
  	var find_candidate = {};

	$('[data-num]').on('click', function() {
		var num = $(this).attr('data-num');
		write(num);
	});

	var write = function(num) {
		if(input.val().length < order_candidates[0].digits){
			input.val(input.val().toString() + num.toString());
		}

		if(input.val().length == order_candidates[0].digits) {
			find_candidate = _.find(seed_candidates, {
		      'tipo': order_candidates[0].id,
		      'numero': input.val(),
		      'estado': user_logged.estado
		    });

		    if (find_candidate) {
		      loadCandidate(find_candidate);
		    } else {
		      alertify.error(order_candidates[0].label + ' não encontrado.');
		    }

			return false;
		}	 
	}

	$(document).on('keypress', function(e) {
		if(e.which == 13){
			confirmation_vote.click();
		}
	});

	//cargo do candidato
	var type_candidate = $('[data-cargo]');
	//foto do candidato
	var img_candidate = $('[data-image]');
	//nome do candidato
	var name_candidate = $('[data-name]');
	//partido do candidato
	var broken_candidate = $('[data-party]');

  	type_candidate.html(order_candidates[0].label);

	//** Carrega os dados do candidato **//
	function loadCandidate(obj) {
	    name_candidate.html(obj.name);
	    broken_candidate.html(obj.partido);
	    img_candidate.attr("src", obj.photo);
	}

	//** Proximo candidato a ser votado **//
  	function nextCandidate() {
	    _.remove(order_candidates, function (n) {
	      return n == order_candidates[0];
	    });
	    localStorage.setItem("order_candidates", JSON.stringify(order_candidates));
  	}

	//** Confirmar voto **///
	function confirmVote() {
	    confirmation_vote.click(function () {
	    	if(input.val().length < order_candidates[0].digits){
					alertify.error(order_candidates[0].label + ' não encontrado.');
			}else{
			console.log("Candidato: ",find_candidate);
			console.log("Eleitor: ",user_logged);	
		      nextCandidate();
		      if (find_candidate.tipo != 5) {
		        window.location = "index.html";
		      } else {	
			  	$("#local_control").hide();
			  	$("#end_vote").removeClass("hide");
		        document.getElementById("audio_play").play();
		        setTimeout(function () {
		          window.location = "../index.html";
		        }, 2000);
		      }
			}
	   	});
	}
	confirmVote();

	//** Cancelar voto **//
	function cancelVote() {
		cancel_vote.click(function () {
			name_candidate.html("");
		    broken_candidate.html("");
		    img_candidate.attr("src", "img/user.png");
		    input.val("");
		});
	}
	cancelVote();

	//** Votar em branco **//
	function voteNull() {
		candidate = order_candidates[0];
		vote_null.click(function () {
			console.log("Candidato: ",seed_candidates[0].wallet);
			console.log("Tipo: ",candidate.id);
			console.log("Eleitor: ",user_logged);	
		  if (candidate.id != 5) {
		    nextCandidate();
		    window.location = "index.html";
		  } else {
		  	$("#local_control").hide();
		  	$("#end_vote").removeClass("hide");
		    document.getElementById("audio_play").play();
		    setTimeout(function () {
		      window.location = "../index.html";
		    }, 2000);
		  }
		});
	}
	voteNull();
});