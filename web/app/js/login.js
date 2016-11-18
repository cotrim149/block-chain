$(document).ready(function () {
  resetSession();

  var Web3 = require('web3');
  var web3 = new Web3();
  var eth = web3.eth; //Contém os métodos relacionados ethereum blockchain.

  // Conexão com o BlockChain
  web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));


  web3.eth.defaultAccount = web3.eth.accounts[0];


  // Carregando contrato
  var votaCoinContract = web3.eth.contract(abiVotaCoin);
  var votaCoin = votaCoinContract.at(votaCoinAddress);




  var btn_login = $("#btnLogin");
  var electoral_title = $("#electoral_title");

  btn_login.click(function () {
    if (electoral_title.val() != "") {
      var voter = _.find(people_voters, {
        'titulo': electoral_title.val()
      });

      if (voter) {
        votaCoin.voter_has_voted(voter.wallet, function (err, value) {
          var qtd_votes = value.toNumber();
          console.log(qtd_votes);
          if (qtd_votes >= order_candidates.length) {
            alertify.error('Eleitor já votou.');
          } else {
            localStorage.setItem("hashOfVotes", '');
            localStorage.setItem("login", JSON.stringify(voter));
            localStorage.setItem("order_candidates", JSON.stringify(order_candidates));

            for (var i = order_candidates.length - qtd_votes; i < order_candidates.length; i++) {
              nextCandidate();
            }

            window.location = "urna.html";
          }
        });

      } else {
        alertify.error('Eleitor não encontrado.');
      }
    } else {
      alertify.error('Coloque seu titulo eleitoral.');
    }
  });
});