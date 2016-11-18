var resetSession = function () {
  localStorage.setItem("hashOfVotes", '');
  localStorage.setItem("login", '');
  localStorage.setItem("order_candidates", '');
};

//** Proximo candidato a ser votado **//
function nextCandidate() {
  var order_candidates = JSON.parse(localStorage.getItem("order_candidates"));
  _.remove(order_candidates, function (n, k) {
    return k == 0;
  });
  localStorage.setItem("order_candidates", JSON.stringify(order_candidates));
}