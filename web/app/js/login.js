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
        'titulo_eleitoral': electoral_title.val()
      });

      if (voter) {
        votaCoin.voter_has_voted(voter.wallet, function (err, value) {
          if (value.toNumber() > 0) {
            alertify.error('Eleitor já votou.');
          } else {
            localStorage.setItem("hashOfVotes", '');
            localStorage.setItem("login", JSON.stringify(voter));
            localStorage.setItem("order_candidates", JSON.stringify([{
              id: 1,
              label: "Deputado estadual",
              digits: 6
            }, {
              id: 2,
              label: "Deputado federal",
              digits: 6
            }, {
              id: 3,
              label: "Senador",
              digits: 3
            }, {
              id: 4,
              label: "Governador",
              digits: 2
            }, {
              id: 5,
              label: "Presidente",
              digits: 2
            }]));

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