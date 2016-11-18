$(document).ready(function () {
  resetSession();

  var btn_login = $("#btnLogin");
  var electoral_title = $("#electoral_title");

  btn_login.click(function () {
    if (electoral_title.val() != "") {
      find = _.find(people_voters, {
        'titulo_eleitoral': electoral_title.val()
      });

      if (find) {

        localStorage.setItem("hashOfVotes", '');
        localStorage.setItem("login", JSON.stringify(find));
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

        window.location = "urna.html"
      } else {
        alertify.error('Eleitor não encontrado.');
      }
    } else {
      alertify.error('Coloque seu titulo eleitoral.');
    }
  });
});