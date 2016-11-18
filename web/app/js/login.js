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
        localStorage.setItem("order_candidates", JSON.stringify(order_candidates));

        window.location = "urna.html"
      } else {
        alertify.error('Eleitor não encontrado.');
      }
    } else {
      alertify.error('Coloque seu titulo eleitoral.');
    }
  });
});