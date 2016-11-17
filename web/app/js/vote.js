$(document).ready(function () {
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

  var type_candidate = $(".type_candidate");
  var number_candidate = $("#numberCandidate");
  var brn_vote = $("#brnVote");
  var container_vote = $("#container_vote");
  var container_details = $("#container_details");
  var number_show_candidate = $(".number_candidate");
  var name_candidate = $(".name_candidate");
  var state_candidate = $(".state_candidate");
  var office_candidate = $(".office_candidate");
  var broken_candidate = $(".broken_candidate");
  var img_candidate = $(".img_candidate");
  var confirmation_vote = $("#confirmation_vote");
  var vote_null = $("#vote_null");
  var cancel_vote = $("#cancel_vote");
  var end_vote = $("#end_vote");
  var find_candidate = {};

  type_candidate.html(order_candidates[0].label);

  brn_vote.click(function () {
    find_candidate = _.find(seed_candidates, {
      'tipo': order_candidates[0].id,
      'numero': $("#numberCandidate").val(),
      'estado': user_logged.estado
    });

    if (find_candidate) {
      container_vote.hide();
      container_details.removeClass("hide");
      container_details.addClass("show");
      loadCandidate(find_candidate);
    } else {
      alertify.error(order_candidates[0].label + ' não encontrado.');
    }
  });

  //** Carrega os dados do candidato **//
  function loadCandidate(obj) {
    number_show_candidate.html(obj.numero);
    name_candidate.html(obj.name);
    state_candidate.html(obj.estado);
    office_candidate.html(order_candidates[0].label);
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
  function confirmVote(candidate) {
    confirmation_vote.click(function () {
      nextCandidate();
      if (find_candidate.tipo != 5) {
        window.location = "vote.html";
      } else {
        container_details.removeClass("show");
        container_details.addClass("hide");
        end_vote.removeClass("hide");
        document.getElementById("audio_play").play();
        setTimeout(function () {
          window.location = "index.html";
        }, 2000);
      }
    });
  }
  confirmVote();

  //** Cancelar voto **//
  function cancelVote() {
    cancel_vote.click(function () {
      container_vote.show();
      //container_details.hide();
      container_details.removeClass("show");
      container_details.addClass("hide");
    });
  }
  cancelVote()

  //** Votar em branco **//
  function voteNull() {
    candidate = order_candidates[0];
    vote_null.click(function () {
      if (candidate.id != 5) {
        nextCandidate();
        window.location = "vote.html";
      } else {
        container_vote.hide();
        container_details.removeClass("show");
        container_details.addClass("hide");
        end_vote.removeClass("hide");
        document.getElementById("audio_play").play();
        setTimeout(function () {
          window.location = "index.html";
        }, 2000);
      }
    });
  }
  voteNull();
});