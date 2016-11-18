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



  var list_type_candidate = $("#list_type_candidate");

  _.forEach(order_candidates, function (value, key) {
    list_type_candidate.append(insertHtmlTypeCandidate(value));
  });

  function insertHtmlTypeCandidate(value) {
    html = '<div class="list-group col-md-2" data-type_candidate="' + value.id + '">'
    html += '<a class="list-group-item active">'
    html += value.label
    html += '</a>'
    html += '</div>'
    return html;
  }

  function insertHtmlCandidate(value) {
    votaCoin.count_votes_per_candidates(value.wallet, function (error, qtd) {
      var votes = qtd.toNumber();
      $("[data-candidate='" + value.id + "']").remove();

      html = '<a href="#" class="list-group-item" data-candidate="' + value.id + '">';
      html += value.name + '<span class="badge">' + votes + '</span>';
      html += '</a>';

      $("[data-type_candidate='" + value.tipo + "']").append(html);
    });

  }

  setInterval(function () {
    _.forEach(seed_candidates, function (value, key) {
      insertHtmlCandidate(value);
    });
  }, 2000);

});