$(document).ready(function () {

  var Web3 = require('web3');
  var web3 = new Web3();
  var eth = web3.eth; //Contém os métodos relacionados ethereum blockchain.

  // Conexão com o BlockChain
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


  web3.eth.defaultAccount = web3.eth.accounts[0];


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

  $('[data-num]').on('click', function () {
    var num = $(this).attr('data-num');
    write(num);
  });

  var write = function (num) {
    if (input.val().length < order_candidates[0].digits) {
      input.val(input.val().toString() + num.toString());
    }

    if (input.val().length == order_candidates[0].digits) {
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

  $(document).on('keypress', function (e) {
    if (e.which == 13) {
      confirmation_vote.click();
    }
  });

  var type_candidate = $('[data-cargo]'); //cargo do candidato
  var img_candidate = $('[data-image]'); //foto do candidato
  var name_candidate = $('[data-name]'); //nome do candidato
  var broken_candidate = $('[data-party]'); //partido do candidato

  type_candidate.html(order_candidates[0].label);

  //** Carrega os dados do candidato **//
  function loadCandidate(obj) {
    name_candidate.html(obj.name);
    broken_candidate.html(obj.partido);
    img_candidate.attr("src", obj.photo);
  }

  //** Proximo candidato a ser votado **//
  function nextCandidate() {
    _.remove(order_candidates, function (n, k) {
      return k == 0;
    });
    localStorage.setItem("order_candidates", JSON.stringify(order_candidates));
  }

  //** Confirmar voto **///
  confirmation_vote.click(function () {
    if (input.val().length < order_candidates[0].digits || find_candidate == undefined) {
      alertify.error(order_candidates[0].label + ' não encontrado.');
    } else {
      console.log("Candidato: ", find_candidate);
      console.log("Eleitor: ", user_logged);
      nextCandidate();

      voteTo(find_candidate);

      if (find_candidate.tipo != 5) {
        goUrna();
      } else {
        ending();
      }
    }
  });

  //** Cancelar voto **//
  cancel_vote.click(function () {
    name_candidate.html("");
    broken_candidate.html("");
    img_candidate.attr("src", "img/user.png");
    input.val("");
  });

  //** Votar em branco **//
  var voteNull = function () {
    var type_candidate = order_candidates[0];
    var candidate = seed_candidates[0];
    vote_null.click(function () {
      console.log("Candidato: ", candidate.wallet);
      console.log("Tipo: ", type_candidate.id);
      console.log("Eleitor: ", user_logged);

      voteTo(candidate);

      if (type_candidate.id != 5) {
        nextCandidate();
        goUrna();
      } else {
        ending();
      }
    });
  }
  voteNull();

  var voteTo = function (candidate) {
    votaCoin.voteTo(user_logged.wallet, candidate.wallet, {
      value: 0,
      gas: votaCoinGas,
      gasPrice: 20000000000
    }, function (err, hash) {
      var hashOfVotes = getHashOfVotes();

      hashOfVotes.push(hash);
      localStorage.setItem("hashOfVotes", JSON.stringify(hashOfVotes));
      console.log(hash);
    });
  };

  var goUrna = function () {
    window.location = "urna.html";
  };

  var goHome = function () {
    resetSession();
    window.location = "login.html";
  };

  var ending = function () {
    var end_vote = $("#end_vote");
    $("#local_control").hide();
    end_vote.removeClass("hide");

    var hashOfVotes = getHashOfVotes();
    _.each(hashOfVotes, function (hashOfVote) {
      end_vote.find('center').append($('<span>').text(hashOfVote));
    });
    document.getElementById("audio_play").play();


    var endTime = 10;
    var timer = 0;
    setInterval(function () {
      if (++timer >= endTime) {
        goHome();
      } else {
        end_vote.find('[data-timer]').text(timer);
      }
    }, 1000);

  }



  var getHashOfVotes = function () {
    var hashOfVotes = localStorage.getItem("hashOfVotes");
    if (hashOfVotes) {
      hashOfVotes = JSON.parse(hashOfVotes);
    } else {
      hashOfVotes = [];
    }
    return hashOfVotes;
  }
});