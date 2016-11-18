$(document).ready(function () {
    var list_type_candidate = $("#list_type_candidate");  

    _.forEach(order_candidates, function(value, key) {
        list_type_candidate.append(insertHtmlTypeCandidate(value));
    });

    function insertHtmlTypeCandidate(value){
      html = '<div class="list-group col-md-2" data-type_candidate="'+value.id+'">'
        html += '<a class="list-group-item active">'
        html += value.label
        html += '</a>'
      html += '</div>'  
      return html;
    }

    function insertHtmlCandidate(value){
      html = '<a href="#" class="list-group-item">'
        html += value.name
      html += '</a>'
      return html;
    }

    _.forEach(seed_candidates, function(value, key) {
      container_type_candidate = $("[data-type_candidate='"+value.tipo+"']");
      if(container_type_candidate){
        container_type_candidate.append(insertHtmlCandidate(value));
      }
    });    

});